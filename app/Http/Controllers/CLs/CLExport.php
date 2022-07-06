<?php

namespace App\Http\Controllers\CLs;

use App\Helpers\FormatHelper;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class CLExport implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    use Exportable;

    protected $data;

    protected $headings = [
        'ID',
        'Productor',
        'Codigo',
        'CCS',
        'Tipo',
        'Estado',
        'Kilogramos',
        'Monto (MN)',
        '3.6%',
        '0.20%',
        'Gasto (CL)',
        'Neto (CL)',
        'Pagado (CL)',
    ];

    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * @return Collection
     */
    public function collection()
    {
        foreach ($this->data as $index => $record) {
            $this->data[$index]->{'status'} = FormatHelper::translateCLStatus(
                $this->data[$index]->{'status'}
            );
            $this->data[$index]->{'cl'} = number_format($this->data[$index]->{'cl'} * 3.6 / 100, 2, '.', '');
            $this->data[$index]->{'percent'} = number_format($this->data[$index]->{'amount'} * 0.20 / 100, 2, '.', '');
            $this->data[$index]->{'cl_final'} = $this->data[$index]->{'cl'} - $this->data[$index]->{'expense'};
        }

        return $this->data;
    }

    /**
     * @return array
     */
    public function headings(): array
    {
        return $this->headings;
    }

    /**
     * @return array
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $cellRange = 'A1:M1';
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);
                $styleArray = [
                    'borders' => [
                        'outline' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                            'color' => ['argb' => '2eab97'],
                        ],
                    ],
                ];

                $event->sheet->getDelegate()->getStyle('A1:M1')->applyFromArray($styleArray);
            },
        ];
    }
}
