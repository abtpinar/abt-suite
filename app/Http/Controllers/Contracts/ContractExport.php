<?php namespace App\Http\Controllers\Contracts;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class ContractExport implements FromCollection, WithHeadings, ShouldAutoSize, WithEvents
{
    use Exportable;

    private $data;

    public function __construct($headings, $data)
    {
        $this->headings = $headings;
        $this->data = $data;
    }

    /**
     * @return Collection
     */
    public function collection()
    {
        return $this->data;
    }

    public function headings(): array
    {
        return $this->headings;
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $cellRange = 'A1:G1'; // All headers
                $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(14);
                $widths = ['A'=>10, 'B'=>35, 'C'=> 35, 'D'=>10, 'E'=>10,'F'=>10, 'E'=>10, 'F'=>10, 'G'=>10];
                foreach ($widths as $k=>$v){
                    $event->sheet->getDelegate()->getColumnDimension($k)->setWidth($v);
                }
                $styleArray = [
                    'borders' => [
                        'outline' => [
                            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THICK,
                            'color' => ['argb' => '2eab97'],
                        ],
                    ],
                ];

                $event->sheet->getDelegate()->getStyle('A1:G1')->applyFromArray($styleArray);
            },
        ];
    }
}