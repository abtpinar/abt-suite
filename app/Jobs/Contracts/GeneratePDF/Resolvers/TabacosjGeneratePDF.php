<?php

namespace App\Jobs\Contracts\GeneratePDF\Resolvers;


use App\Data\Entities\ClosedContract;
use App\Data\Entities\Contract;
use App\Data\Entities\TobaccoPrice;
use App\Data\Repositories\Contracts\ContractsRepository;
use App\Helpers\ContractsHelper;
use App\Helpers\FormatHelper;
use App\Jobs\Job;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Mpdf\Mpdf;
use Mpdf\MpdfException;
use App\Support\Enums;

class TabacosjGeneratePDF extends Job
{
    #region Constructor and Properties

    /**
     * @var Contract contract
     */
    public $contract;

    /**
     * @var array contract
     */
    public $data;

    /**
     * @var ContractsRepository
     */
    private $repository;

    /**
     * @var string
     */
    private $pdfsDirectory;

    /**
     * GeneratePDF constructor.
     * @param array $data
     * @param ContractsRepository $repository
     */
    public function __construct(
        array $data,
        ContractsRepository $repository
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
        $contract = $this->repository->find($this->data['id']);
        /*return $contract; exit();*/
        $uuid = uniqid();
        $fileName = $uuid . '.pdf';
        $outputDirectory = $this->pdfsDirectory . $fileName;

        if ($contract) {
            $this->contract = $contract;
        }
        /*return $this->pdfHTMLView();exit();*/
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
                'default_font_size' => 12,
                'margin_left' => 15,
                'margin_right' => 15,
                'margin_top' => 25,
                'margin_bottom' => 25,
                'margin_header' => 0,
                'margin_footer' => 5,
                'orientation' => 'P',
                'use_kwt' => true
            ]
        );
        $mpdf->SetDisplayMode('fullpage');

        $this->initializePDFsContainerFolder();
        $data = $this->collectContractData();
        $mpdf->autoPageBreak = false;

        $mpdf->WriteHTML(view('templates.tabacosj.v1.contract', $data)->__toString());

        return $mpdf;
    }

    /**
     * @return array
     */
    private function collectContractData(): array
    {
        /*$property_type = 'Propietario';collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.property_types'))->where('code', $this->contract->farmer->property_type)->first()['name'];*/
        $farms = $this->contract->farmer->getFarms;
        $properties = [];
        $numberRecords = [];
        $dates = [];
        $area = 0;
        $index = 0;
        if ($this->contract->tobacco_type != Enums::TOBACCO_TYPE[0] && $this->contract->tobacco_type != Enums::TOBACCO_TYPE[4]) {
            $this->contract->tobacco_type != Enums::TOBACCO_TYPE[3] && $this->contract->export_porcentage > 80 ? $export_percentage = 80 : $export_percentage = $this->contract->export_porcentage;
            $this->contract->tobacco_type == Enums::TOBACCO_TYPE[3] && $this->contract->export_porcentage > 80 ? $export_percentage = 80 : $export_percentage = $this->contract->export_porcentage;
            $tobacco_price = TobaccoPrice::where('percent', $export_percentage)
                ->where('tobacco_type_code', $this->contract->tobacco_type)->get()[0]['price'];
        }else {$tobacco_price = 0;}
        foreach ($farms as $farm) {
            $area += $farm->total_area;
            $properties[$index] = collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.property_types'))->where('code', $farm->possesion_type_code)->first()['name'];
            $numberRecords[$index] = $farm->record_number;
            $dates[$index] = $farm->activation_date;
            $index++;
        }

        return [
            'contract' => $this->contract,
            'propesrties' => $properties,
            'area' => $area,
            'record_numbers' => $numberRecords,
            'dates' => $dates,
            'tobacco_price' => $tobacco_price,
            'cl_purchase_budget' => $this->contractClPurchaseBudget(),
            'sale_price' => $this->contractSalePrice(),
            'gather_value' => $this->contractGatherValue(),
            'purchase_budget' => $this->purchaseBudget(),
            //'total' => 0
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

    private function contractSalePrice()
    {
       /* $gathers = $this->contract->tobaccoClassSchedules;
        $saleValue = 0;*/

        /*foreach ($gathers as $gather)
            $saleValue += $gather->price;*/

        return round($this->contractGatherValue() / ($this->contract->production), 2);
    }

    private function contractGatherValue()
    {
        $gathers = $this->contract->tobaccoClassSchedules;
        $gatherValue = 0;

        foreach ($gathers as $gather)
            $gatherValue += ($gather->price * $gather->amount);

        return round($gatherValue, 2);
    }

    public function contractClPurchaseBudget()
    {
        $clBudget = 0;
        foreach ($this->contract->tobaccoClassSchedules as $gatheringClass) {
            if (($gatheringClass->tobaccoClass->type == 'EX' &&
                ($gatheringClass->tobaccoClass->group == 01 || $gatheringClass->tobaccoClass->group == 02) ||
                ($this->contract->tobacco_type == 'BY' && $gatheringClass->tobaccoClass->type == 'EX'))
            ) {
                $clBudget += ($gatheringClass->amount * $gatheringClass->tobaccoClass->price);
            }
        }
        return round($clBudget * 0.036, 2);
    }

    public function purchaseBudget()
    {
        $purchase_budget = 0;

        foreach ($this->contract->products as $product) {
            $purchase_budget += $product->amount * $product->price;
        }

        return $purchase_budget;
    }
}