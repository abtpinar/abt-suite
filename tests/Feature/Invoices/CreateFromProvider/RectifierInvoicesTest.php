<?php

namespace Tests\Feature\Invoices\CreateFromProvider;

use Tests\TestCase;
use App\Data\Entities\Invoice;
use App\Data\Entities\Receivable;
use App\Data\Entities\ClosedInvoice;
use App\Data\Entities\ReceivableHistories;
use App\Jobs\Invoices\CreateFromProvider\CreateFromProvider;

/**
 * Cubre los test para la llegada de facturas rectificativas
 */
class RectifierInvoicesTest extends TestCase
{
    public function test_rectifier_invoice_with_zero_amount()  //@codingStandardsIgnoreLine
    {
        /**
         * contract_id 3041
         */
        $this->prepareFirstTest();

        $newZeroRectifier = ClosedInvoice::find(58668);

        $job = app(CreateFromProvider::class, ['data' => [
            'id' => $newZeroRectifier->id,
            'calculate_with_advance' => false
        ]]);

        $response = $job->handle();

        $this->assertArraySubset([
            'status' => 'OK',
            'message' => 'Factura cerrada. No es necesario crear factura al cliente al ser los importes iguales.',
            'data' => []
        ], $response);

        $this->assertCount(1, Invoice::where('related_invoice', '2020V000835')->get());

        $cancellationInvoice = Invoice::where('related_invoice', '2020V000835')->first();
        $this->assertEquals(-10.94, $cancellationInvoice->total_amount);
        $this->assertEquals('FINISHED', $cancellationInvoice->status, 'La factura no está finalizada');

        $annulledInvoice = Invoice::find(54788);
        $this->assertEquals('ANNULLED', $annulledInvoice->status, 'La factura no fue anulada');

        $this->assertEquals(
            0,
            $cancellationInvoice->Receivables->sum('import') + $annulledInvoice->Receivables->sum('import'),
            'Los cobros de las facturas no se compensan'
        );
    }

    public function test_many_rectifiers_of_rectifiers()  //@codingStandardsIgnoreLine
    {
        /**
         * contract_id 10054
         */
        $this->prepareSecondTest();

        //dd('prepared');

        $firstRectifier = ClosedInvoice::find(58602);
        $job = app(CreateFromProvider::class, ['data' => [
            'id' => $firstRectifier->id,
            'calculate_with_advance' => false
        ]]);
        $firstResponse = $job->handle();
        $this->assertArraySubset([
            'status' => 'OK',
            'data' => 'Invoice agregado correctamente.'
        ], $firstResponse);

        $secondRectifier = ClosedInvoice::find(58625);
        $job = app(CreateFromProvider::class, ['data' => [
            'id' => $secondRectifier->id,
            'calculate_with_advance' => false
        ]]);
        $secondResponse = $job->handle();
        $this->assertArraySubset([
            'status' => 'OK',
            'data' => 'Invoice agregado correctamente.'
        ], $secondResponse);


        $thirdRectifier = ClosedInvoice::find(58675);

        $job = app(CreateFromProvider::class, ['data' => [
            'id' => $thirdRectifier->id,
            'calculate_with_advance' => false
        ]]);

        $thirdResponse = $job->handle();

        // dd($secondResponse);


        // $newZeroRectifier = ClosedInvoice::find(58668);

        // $job = app(CreateFromProvider::class, ['data' => [
        //     'id' => $newZeroRectifier->id,
        //     'calculate_with_advance' => false
        // ]]);

        // $response = $job->handle();

        // $this->assertArraySubset([
        //     'status' => 'OK',
        //     'data' => 'Invoice agregado correctamente.'
        // ], $response);

        // $this->assertCount(1, Invoice::where('related_invoice', '2020V000835')->get());

        // $cancellationInvoice = Invoice::where('related_invoice', '2020V000835')->first();
        // $this->assertEquals(-10.94, $cancellationInvoice->total_amount);
        // $this->assertEquals('FINISHED', $cancellationInvoice->status, 'La factura no está finalizada');

        // $annulledInvoice = Invoice::find(54788);
        // $this->assertEquals('ANNULLED', $annulledInvoice->status, 'La factura no fue anulada');

        // $this->assertEquals(
        //     0,
        //     $cancellationInvoice->Receivables->sum('import') + $annulledInvoice->Receivables->sum('import'),
        //     'Los cobros de las facturas no se compensan'
        // );
    }

    /**
     * Se toma una base del contrato 3041 para preparar el test
     *
     * @return void
     */
    private function prepareFirstTest()
    {
        $annulledInvoice = Invoice::find(54788);
        $annulledInvoice->status = 'PENDING';
        $annulledInvoice->save();

        $annulledInvoiceReceivable = Receivable::find(54446);
        $annulledInvoiceReceivable->total_amount_paid = 0;
        $annulledInvoiceReceivable->difference = 10.94;
        $annulledInvoiceReceivable->status = 'PENDING';
        $annulledInvoiceReceivable->save();

        ReceivableHistories::where('receivable_id', 54446)
            ->delete();

        Receivable::where('id', '>', 54446)
            ->where('contract_id', 3041)
            ->delete();

        Invoice::where('related_invoice', '2020V000835')->delete();
    }

    /**
     * Se toma una base del contrato 10054 para preparar el test
     *
     * @return void
     */
    private function prepareSecondTest()
    {
        foreach (Invoice::whereIn('id', [34230, 42352, 51266])->get() as $invoice) {
            $invoice->status = 'REMITTED';
            $invoice->save();
        }

        foreach (Receivable::whereIn('id', [33849, 41786, 50903])->get() as $invoice) {
            $invoice->status = 'REMITTED';
            $invoice->save();
        }

        Invoice::where('contract_id', 10054)
            ->where('id', '>', 51266)
            ->delete();
        
        ReceivableHistories::where('receivable_id', 33849)
            ->where('id', '>', 32337)
            ->delete();

        ReceivableHistories::where('receivable_id', 41786)
            ->where('id', '>', 40570)
            ->delete();

        ReceivableHistories::where('receivable_id', 50903)
            ->where('id', '>', 50129)
            ->delete();
    }
}
