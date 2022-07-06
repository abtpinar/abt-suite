<?php
/**
 * Created by PhpStorm.
 * User: charly
 * Date: 12/07/19
 * Time: 13:50
 */

namespace Tests\Unit\Entity;


use App\Data\Entities\Invoice;
use App\Data\Entities\InvoiceDetails;
use Tests\TestCase;

class InvoiceDetailsTest extends TestCase
{
    /**
     * @Data_Provider
     */
    public function testCreateFromAdditionalData()
    {
        $additionalData = json_decode(
            '{"key":"10002","name":"T\u00e9rmino Potencia","details":[{"label":"P1 3.450 kW x 9 D\u00edas x 0.135735 \u20ac\/kW d\u00eda","total":""}],"grandTotal":"4.21"}',
            true
        );

        $invoice = new Invoice();
        $invoice->iva_rate = 1.000;

        $invoiceDetailtsList = InvoiceDetails::createFromAdditionData(
            $additionalData,
            $invoice
        );

        foreach ($invoiceDetailtsList as $invoiceDetails)
        {
            $this->assertInstanceOf(InvoiceDetails::class, $invoiceDetails);
            $this->assertEquals(10002, $invoiceDetails->key);
            $this->assertEquals(
                "Término Potencia",
                $invoiceDetails->concept_name
            );
            $this->assertEquals(
                "P1 3.450 kW x 9 Días x 0.135735 €/kW día",
                $invoiceDetails->description
            );
            $this->assertEquals(0.135735, $invoiceDetails->price);
            $this->assertEquals(3.450, $invoiceDetails->quantity);
            $this->assertEquals(1.000, $invoiceDetails->tax_percentage);
            $this->assertEquals(4.21, $invoiceDetails->amount);
        }

        $additionalData = json_decode(
            '{"key":"30002","name":"T\u00e9rmino Energ\u00eda","details":[{"label":"Punta 28 kWh x 0.151793 \u20ac\/kWh","total":"4.25"},{"label":"Llano 75 kWh x 0.080611 \u20ac\/kWh","total":"6.05"}],"grandTotal":"10.30"}',
            true
        );

        $invoice = new Invoice();
        $invoice->iva_rate = 1.000;

        $invoiceDetailtsList = InvoiceDetails::createFromAdditionData(
            $additionalData,
            $invoice
        );

        $this->assertCount(2, $invoiceDetailtsList);

        $this->assertInstanceOf(InvoiceDetails::class, $invoiceDetailtsList[0]);
        $this->assertEquals(30002, $invoiceDetailtsList[0]->key);
        $this->assertEquals("Término Energía", $invoiceDetailtsList[0]->concept_name);
        $this->assertEquals(
            "Punta 28 kWh x 0.151793 €/kWh",
            $invoiceDetailtsList[0]->description
        );
        $this->assertEquals(0.151793, $invoiceDetailtsList[0]->price);
        $this->assertEquals(28, $invoiceDetailtsList[0]->quantity);
        $this->assertEquals(1.000, $invoiceDetailtsList[0]->tax_percentage);
        $this->assertEquals(4.25, $invoiceDetailtsList[0]->amount);

        $this->assertInstanceOf(InvoiceDetails::class, $invoiceDetailtsList[1]);
        $this->assertEquals(30002, $invoiceDetailtsList[1]->key);
        $this->assertEquals("Término Energía", $invoiceDetailtsList[1]->concept_name);
        $this->assertEquals(
            "Llano 75 kWh x 0.080611 €/kWh",
            $invoiceDetailtsList[1]->description
        );
        $this->assertEquals(0.080611, $invoiceDetailtsList[1]->price);
        $this->assertEquals(75, $invoiceDetailtsList[1]->quantity);
        $this->assertEquals(1.000, $invoiceDetailtsList[1]->tax_percentage);
        $this->assertEquals(6.05, $invoiceDetailtsList[1]->amount);


        $additionalData = json_decode(
            '{"key":"50002","name":"Alquiler Equipo Distribuidora
","details":[{"label":"Alquiler Equipo Distribuidora","total":"9.59"}],"grandTotal":"9.59"}',
            true
        );

        $invoice = new Invoice();
        $invoice->iva_rate = 1.000;

        $invoiceDetailtsList = InvoiceDetails::createFromAdditionData(
            $additionalData,
            $invoice
        );

        foreach ($invoiceDetailtsList as $invoiceDetails)
        {
            $this->assertInstanceOf(InvoiceDetails::class, $invoiceDetails);
            $this->assertEquals(50002, $invoiceDetails->key);
            $this->assertEquals(
                "Alquiler Equipo Distribuidora",
                $invoiceDetails->concept_name
            );
            $this->assertEquals(
                "Alquiler Equipo Distribuidora",
                $invoiceDetails->description
            );
            $this->assertEquals(0.135735, $invoiceDetails->price);
            $this->assertEquals(3.450, $invoiceDetails->quantity);
            $this->assertEquals(1.000, $invoiceDetails->tax_percentage);
            $this->assertEquals(4.21, $invoiceDetails->amount);
        }
    }
}