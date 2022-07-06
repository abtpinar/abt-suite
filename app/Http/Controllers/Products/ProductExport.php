<?php namespace App\Http\Controllers\Products;

use App\Data\Entities\Product;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;

class ProductExport implements WithHeadings, WithEvents /*FromCollection, WithHeadings, ShouldAutoSize, WithEvents*/
{
    use Exportable;

    private $headings;

    public function __construct($headings)
    {
        $this->headings = $headings;
    }
 
     public function headings(): array
     {
         return $this->headings;
     }
 
     public function registerEvents(): array
     {
         return [
             AfterSheet::class => function (AfterSheet $event) {
                 $cellRange = 'A1:F1'; // All headers
                 $event->sheet->getDelegate()->getStyle($cellRange)->getFont()->setSize(12);
                 $widths = ['A'=>10, 'B'=>25, 'C'=> 15, 'D'=>10, 'E'=>10,'F'=>10, 'E'=>10, 'F'=>25, 'G'=>35, 'H'=>35,'I'=>35,'J'=>35,'K'=>35,'L'=>35,];
                 foreach ($widths as $k=>$v){
                     $event->sheet->getDelegate()->getColumnDimension($k)->setWidth($v);
                 }
                 
                 $styleArray = [
                     'borders' => [
                         'outline' => [
                             'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_NONE,
                             'color' => ['argb' => '#000000'],//2eab97
                         ],
                     ],
                 ];
 
                 $event->sheet->getDelegate()->getStyle($cellRange)->applyFromArray($styleArray);
             },
         ];
     }
}