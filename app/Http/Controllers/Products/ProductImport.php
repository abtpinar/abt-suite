<?php

namespace App\Http\Controllers\Products;

use App\Data\Entities\Product;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;

class ProductImport implements ToModel, WithHeadingRow, WithValidation
{
    use Importable;

    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
       /* dd($row);*/
        return new Product([
            'code' => $row['codigo'],
            'name' => $row['nombre'],
            'category' => $row['categoria'],
            'price' => $row['precio'],
            'price_history' => $row['precio'],
            'measurement_unit' => $row['um'],
            'expense_concept' => $row['tipo_gasto'],
            'consumption_standard_tp' => $row['consumo_tapado'],
            'consumption_standard_v1' => $row['consumo_vega_fina'],
            'consumption_standard_v2' => $row['consumo_vega_segunda'],
            'consumption_standard_sp' => $row['consumo_sol_palo'],
            'consumption_standard_by' => $row['consumo_burley'],
            'consumption_standard_vg' => $row['consumo_virginia'],
        ]);
    }

    public function rules(): array
    {
        return [
            'codigo' => 'required',
            'nombre' => 'required',
            'categoria' => 'required',
            'precio' => 'required',
            'um' => 'required'
        ];
    }
}
