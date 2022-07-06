<?php

namespace App\Jobs\CLs\GeneratePDF\Resolvers;


use App\Data\Entities\CL;
use App\Data\Repositories\Contracts\CLsRepository;
use App\Jobs\Job;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Mpdf\Mpdf;
use Mpdf\MpdfException;

class TabacosjGeneratePDF extends Job
{
    #region Constructor and Properties

    /**
     * @var CL[] cl
     */
    public $cls;

    /**
     * @var array cl
     */
    public $data;

    /**
     * @var CLsRepository
     */
    private $repository;

    /**
     * @var string
     */
    private $pdfsDirectory;

    /**
     * GeneratePDF constructor.
     * @param array $data
     * @param CLsRepository $repository
     */
    public function __construct(
        array               $data,
        CLsRepository $repository
    )
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->pdfsDirectory = public_path('downloads/pdfs/');
    }

    #endregion

    /**
     * @return string
     * @throws MpdfException
     */
    public function handle()
    {
        $cl = $this->repository->all();
        $uuid = uniqid();
        $fileName = $uuid . '.pdf';
        $outputDirectory = $this->pdfsDirectory . $fileName;

        if ($cl) {
            $this->cl = $cl;
        }

        return $this->pdfHTMLView()->Output($outputDirectory, \Mpdf\Output\Destination::STRING_RETURN);
    }

    /**
     * @return Mpdf
     * @throws MpdfException
     */
    public function pdfHTMLView(): Mpdf
    {
        $mpdf = new Mpdf(
            [
                'format' => 'Letter',
                'fontDir' => [storage_path('app/fonts')],
                'fontdata' => [
                    'titilliumweb' => [
                        'R' => 'TitilliumWeb-Regular.ttf',
                        'B' => 'TitilliumWeb-Bold.ttf',
                        'I' => 'TitilliumWeb-Italic.ttf',
                        'BI' => 'TitilliumWeb-BoldItalic.ttf',
                    ]
                ],
                'default_font_size' => 11,
                'default_font' => 'titilliumweb',
                'default_font_size' => 12,
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 10,
                'margin_bottom' => 15,
                'margin_header' => 0,
                'margin_footer' => 10,
                'orientation' => 'P',
            ]
        );
        $mpdf->SetDisplayMode('fullpage');

        $this->initializePDFsContainerFolder();
        $data = $this->collectCLData();
        $mpdf->autoPageBreak = false;
        $footer = '<div class="tc" style="font-size: 8px;">Km 1 1/2 Carretera Punta de Carta, San Juan y Martínez, Pinar del Río, La Habana, Cuba. Tel.: 798137 y 798382</div>';
        $mpdf->SetHTMLFooter($footer);
        $mpdf->WriteHTML(view('templates.tabacosj.v1.cl', $data)->__toString());

        return $mpdf;
    }

    /**
     * @return array
     */
    private function collectCLData(): array
    {
        return [
            'cls' => $this->cls
        ];
    }

    /**
     *
     */
    private function initializePDFsContainerFolder()
    {
        $downloads = public_path('downloads');

        if (!file_exists($downloads)) {
            mkdir($downloads);
        }

        if (!file_exists($this->pdfsDirectory)) {
            mkdir($this->pdfsDirectory);
        }
    }
}