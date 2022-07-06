<?php

namespace Tests\Feature\Receivables\AddFromGasInvoice;

use Tests\TestCase;
use App\Data\Entities\Invoice;
use App\Data\Entities\GasInvoice;
use App\Data\Entities\Receivable;
use App\Data\Entities\ReceivableHistories;
use App\Jobs\Receivables\CreateFromInvoice\CreateFromInvoice;
use App\Jobs\Receivables\CreateFromGasInvoice\CreateFromGasInvoice;

/**
 * Para pagar un cobro nuevo, se usa deuda con el cliente
 */
class UseDebtTest extends TestCase
{
    // public function test_use_finished_receivable_with_debt_greater_than_new_invoice_amount_for_compensations()  //@codingStandardsIgnoreLine
    // {
    //     /**
    //      * contract_id 3438
    //      */
    //     $this->prepareFirstTest();

    //     $newInvoice = Invoice::find(57440);

    //     $job = app(CreateGasFromInvoice::class, ['data' => ['id' => $newInvoice->id]]);

    //     $response = $job->handle();

    //     $this->assertArraySubset([
    //         'status' => 'OK',
    //         'data' => 'Cobro creado correctamente.'
    //     ], $response);

    //     $overPaidInvoice = Invoice::find(8852);
    //     $this->assertCount(1, $overPaidInvoice->Receivables);

    //     $receivableOverPaid = Receivable::find(8607);
    //     $this->assertEquals($receivableOverPaid->import, 35.94);
    //     $this->assertEquals($receivableOverPaid->total_amount_paid + $newInvoice->total_amount, 3438);

    //     $newInvoice->refresh();
    //     $this->assertEquals($newInvoice->status, 'FINISHED');
    // }

    // public function test_use_finished_receivable_with_debt_lower_than_new_invoice_amount_for_compensations()  //@codingStandardsIgnoreLine
    // {
    //     $case = 'equal';
    //     //$case = 'lower';
    //     /**
    //      * contract_id 3438
    //      */
    //     $this->prepareSecondTest($case);

    //     //dd('prepared');

    //     $newInvoice = Invoice::find(51592);

    //     $job = app(CreateFromInvoice::class, ['data' => ['id' => $newInvoice->id]]);

    //     $response = $job->handle();

    //     $this->assertArraySubset([
    //         'status' => 'OK',
    //         'data' => 'Cobro creado correctamente.'
    //     ], $response);

    //     $overPaidInvoice = Invoice::find(43618);
    //     $this->assertCount(1, $overPaidInvoice->Receivables);

    //     $receivableOverPaid = Receivable::find(43081);
    //     $this->assertEquals(467.62, $receivableOverPaid->import);
    //     $this->assertEquals($receivableOverPaid->total_amount_paid, $overPaidInvoice->total_amount);

    //     $newInvoice->refresh();
    //     if ($case == 'lower') {
    //         $this->assertEquals('PENDING', $newInvoice->status);
    //         $this->assertCount(2, $newInvoice->Receivables);
    //     } else {
    //         $this->assertEquals('FINISHED', $newInvoice->status);
    //         $this->assertCount(1, $newInvoice->Receivables);
    //     }

    //     $this->assertEquals($newInvoice->total_amount, $newInvoice->Receivables->sum('import'));
    // }

    public function test_use_pending_receivable_with_debt_greater_than_new_invoice_amount_for_compensations()  //@codingStandardsIgnoreLine
    {
        /**
         * contract_id 1
         */
        $this->prepareThirdTest();

        $job = app(CreateFromGasInvoice::class, ['data' => ['id' => 328]]);

        $response = $job->handle();

        $this->assertArraySubset([
            'status' => 'OK',
            'data' => 'Cobro creado correctamente.'
        ], $response);

        $negativeInvoice = GasInvoice::find(292);
        $this->assertCount(2, $negativeInvoice->Receivables);
        $this->assertEquals($negativeInvoice->status, 'PENDING');
        $this->assertEquals($negativeInvoice->total_amount, $negativeInvoice->Receivables->sum('import'));

        $newInvoice = GasInvoice::find(328);
        $this->assertEquals($newInvoice->status, 'FINISHED');
    }

    /**
     * Se toma una base del contrato 3438 para preparar el test
     *
     * @return void
     */
    private function prepareFirstTest()
    {
        $receivableOverPaid = Receivable::find(8607);
        $receivableOverPaid->import = 35.94;
        $receivableOverPaid->total_amount_paid = 3438;
        $receivableOverPaid->difference = -3402.06;
        $receivableOverPaid->status = 'FINISHED';
        $receivableOverPaid->save();

        Receivable::query()->where('contract_id', 3438)
            ->where('source', 'Electricidad')
            ->where('id', '>=', 57112)->delete();

        ReceivableHistories::where('receivable_id', 8607)
            ->where('id', '>', 15211)
            ->delete();

        $invoice = Invoice::find(57440);
        $invoice->status = 'PENDING';
        $invoice->save();
    }

    private function prepareSecondTest($case)
    {
        $overPaidReceivable = Receivable::find(43081);
        $overPaidReceivable->import = 467.62;

        if ($case == 'lower') {
            $overPaidReceivable->total_amount_paid = 667.62;
            $overPaidReceivable->difference = -200;
        } else {
            $overPaidReceivable->total_amount_paid = 726.2;
            $overPaidReceivable->difference = -258.58;
        }

        $overPaidReceivable->status = 'FINISHED';
        $overPaidReceivable->save();

        ReceivableHistories::where('receivable_id', 43081)
            ->where('id', '>', 41860)
            ->delete();

        $history = ReceivableHistories::find(41860);
        $history->amount_paid = 667.62;
        $history->save();
    
        Receivable::query()->where('contract_id', 2)
            ->where('source', 'Electricidad')
            ->where('id', '>', 43081)->delete();

        $newInvoice = Invoice::find(51592);
        $newInvoice->status = 'PENDING';
        $newInvoice->save();

        $overPaidInvoice = Invoice::find(43618);
        $overPaidInvoice->status = 'FINISHED';
        $overPaidInvoice->save();
    }

    /**
     * Se toma una base del contrato 271 para preparar el test
     *
     * @return void
     */
    private function prepareThirdTest()
    {
        $negativeReceivable = Receivable::find(76723);
        $negativeReceivable->import = -266.12;
        $negativeReceivable->total_amount_paid = 0;
        $negativeReceivable->difference = -266.12;
        $negativeReceivable->status = 'PENDING';
        $negativeReceivable->save();

        Receivable::query()->where('contract_id', 271)
            ->where('source', 'Gas')
            ->where('id', '>', 76723)->delete();

        ReceivableHistories::where('receivable_id', 76723)
            ->delete();

        $negativeInvoice = GasInvoice::find(292);
        $negativeInvoice->status = 'PENDING';
        $negativeInvoice->save();

        $newInvoice = GasInvoice::find(328);
        $newInvoice->status = 'PENDING';
        $newInvoice->save();
    }
}
