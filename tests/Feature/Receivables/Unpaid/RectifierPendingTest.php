<?php

namespace Tests\Feature\Receivables\Unpaid;

use Tests\TestCase;
use App\Data\Entities\Invoice;
use App\Data\Entities\Receivable;
use App\Data\Entities\ReceivableHistories;
use App\Data\Entities\ReceivableRemittance;
use App\Data\Entities\ReceivableUnpaid;
use App\Jobs\Receivables\AddReceivableUnpaid\AddReceivableUnpaid;
use App\Jobs\Receivables\AddReceivableUnpaid\AddManualReceivableUnpaid;

/**
 * RectifierPendingTest comprueba el funcionamiento de cobros ante un impago de una factura rectificada
 *
 * El caso que se comprueba es para una factura que es rectificada, pero ya estando remesada, con lo cual
 * se crea un cobro de la rectificativa por la diferencia.
 *
 * Al entrar un impago de la factura anulada y
 * * el cobro de la rectificativa está pendiente,
 * se debe cambiar ese cobro por la diferencia para llevarlo a un cobro
 * por el total de la factura nueva rectificativa.
 *
 * Las facturas anulada y anuladora se compensarán entre ellas.
 */
class RectifierPendingTest extends TestCase
{
    /**
     * Caso 2 tipo 1 Contrato 881
     *
     * @return void
     */
    public function testUnpaidJob()
    {
        $this->prepareTest();

        //dd('prepared');

        //comprobar que efectivamente la factura anuladora no tiene ningun cobro
        $annulledInvoice = Invoice::find(29520);
        $cancellationInvoice = Invoice::where('related_invoice', $annulledInvoice->number)
                                    ->where('type', 'CANCELLATION')
                                    ->first();

        $this->assertCount(0, $cancellationInvoice->Receivables);

        $job = app(AddReceivableUnpaid::class, ['data' => [
            'sepa_msgId' => 'DA20190124051542595659SCP74EN1914',
            'remittance_end_to_end_id' => '153366',
            'code' => 'AM04',
            'receivable_id' => 29141,
            'unpaid_date' => '2019-01-24'
        ]]);

        $response = $job->handle();

        $this->assertArraySubset(['status' => 'OK'], $response);

        //comprobar si el cobro de la rectificativa ahora es por la cantidad total
        $rectifierInvoiceReceivable = Receivable::find(31222);
        $rectifierInvoice = Invoice::find(31597);
        $this->assertEquals($rectifierInvoice->total_amount, $rectifierInvoiceReceivable->difference);

        //comprobar si el cobro de la anulada está pagado
        $annulledInvoiceReceivable = Receivable::find(29141);
        $annulledInvoice = Invoice::find(29520);
        $this->assertEquals($annulledInvoice->total_amount, $annulledInvoiceReceivable->total_amount_paid);

        //comprobar si el cobro de la anuladora fue creado y compensado
        $cancellationInvoice = Invoice::where('related_invoice', $rectifierInvoice->related_invoice)
                                    ->where('type', 'CANCELLATION')
                                    ->first();
        
        $this->assertCount(1, $cancellationInvoice->Receivables);
        $this->assertEquals(
            $cancellationInvoice->total_amount,
            $cancellationInvoice->Receivables->first()->total_amount_paid
        );
        
        $this->assertNotNull($cancellationInvoice);
    }

    public function test_unpaid_with_rectifier_that_has_many_receivables() //@codingStandardsIgnoreLine
    {
        $this->prepareSecondTest();

        $job = app(AddManualReceivableUnpaid::class, ['data' => [
            'sepa_msgId' => 'DA20190124051542595659SCP74EN1914',
            'remittance_end_to_end_id' => '151058',
            'code' => 'AM04',
            'receivable_id' => 53312,
            'unpaid_date' => '2019-01-24'
        ]]);

        $response = $job->handle();

        $this->assertArraySubset(['status' => 'OK'], $response);
    }

    /**
     * Se toma una base del contrato 881 para preparar el test
     *
     * @return void
     */
    private function prepareTest()
    {
        ReceivableUnpaid::query()->where('remittance_end_to_end_id', '153366')->delete();
        Receivable::query()->where('id', 31273)->delete();

        $remittance = ReceivableRemittance::query()->where('receivable_id', 29141)->first();

        if (!$remittance) {
            ReceivableRemittance::where('remittance_end_to_end_id', '153366')->delete();
            ReceivableRemittance::create([
                'remittance_end_to_end_id' => '153366',
                'remittance_mndtId' => '00210465604916102018',
                'remittance_msgId' => '50000',
                'remittance_date' => '2019-06-21',
                'charge_date' => '2019-06-22',
                'status' => 'REMITTED',
                'file_name' => '50000.xml',
                'iban' => 'ES0321005542192200336951',
                'creditor_iban' => 'ES3121006861490200077326',
                'receivable_id' => 29141,
                'bank_account_id' => 1
            ]);
        }

        $annulledInvoice = Invoice::find(29520);
        $annulledInvoice->status = 'ANNULLED';
        $annulledInvoice->save();

        $rectifierInvoice = Invoice::find(31597);
        $rectifierInvoice->status = 'PENDING';
        $rectifierInvoice->save();

        //Eliminar cobro de la anuladora si existiese
        Receivable::where('invoice_id', 31596)->where('source', 'Electricidad')->delete();

        // #cobro de la anulada
        $annulledInvoiceReceivable = Receivable::find(29141);
        $annulledInvoiceReceivable->status = 'REMITTED';
        $annulledInvoiceReceivable->import = 112.64;
        $annulledInvoiceReceivable->difference = 112.64;
        $annulledInvoiceReceivable->total_amount_paid = 0;
        $annulledInvoiceReceivable->save();
        ReceivableHistories::where('receivable_id', 29141)->delete();

        // cobro de la rectificativa
        $rectifierInvoiceReceivable = Receivable::find(31222);
        $rectifierInvoiceReceivable->import = -60.57;
        $rectifierInvoiceReceivable->difference = -60.57;
        $rectifierInvoiceReceivable->total_amount_paid = 0;
        $rectifierInvoiceReceivable->status = 'PENDING';
        $rectifierInvoiceReceivable->save();
        Receivable::where('id', '>', 31222)->where('invoice_id', $rectifierInvoice->id)->delete();

        ReceivableHistories::where('receivable_id', 31222)->delete();
    }

    /**
     * Se toma una base del contrato 8420 para preparar el test
     *
     * @return void
     */
    private function prepareSecondTest()
    {
        ReceivableUnpaid::query()->where('remittance_end_to_end_id', '151058')->delete();

        $annulledInvoiceReceivable = Receivable::find(53312);
        $annulledInvoiceReceivable->status = 'REMITTED';
        $annulledInvoiceReceivable->import = 389.34;
        $annulledInvoiceReceivable->difference = 389.34;
        $annulledInvoiceReceivable->total_amount_paid = 0;
        $annulledInvoiceReceivable->save();
        ReceivableHistories::where('receivable_id', 53312)->delete();

        $rectifierInvoice = Invoice::find(55688);
        $rectifierInvoice->status = 'PENDING';
        $rectifierInvoice->save();
        
        $rectifierInvoicePendingReceivable = Receivable::find(60948);
        $rectifierInvoicePendingReceivable->status = 'PENDING';
        $rectifierInvoicePendingReceivable->total_amount_paid = 0;
        $rectifierInvoicePendingReceivable->difference = -13.36;
        $rectifierInvoicePendingReceivable->total_amount_paid = 0;
        $rectifierInvoicePendingReceivable->save();

        Receivable::where('id', '>', 60949)->where('contract_id', 8420)->delete();
    }
}
