<?php

namespace App\Jobs\Farmers\GeneratePDF\Resolvers;


use App\Data\Entities\ClosedContract;
use App\Data\Entities\Farmer;
use App\Data\Repositories\Contracts\ContractsRepository;
use App\Data\Repositories\Contracts\FarmersRepository;
use App\Data\Repositories\Contracts\TobaccoPriceRepository;
use App\Helpers\ContractsHelper;
use App\Jobs\Job;
use Mpdf\Mpdf;
use Mpdf\MpdfException;
use App\Support\Enums;

class TabacosjGeneratePDF extends Job
{
    #region Constructor and Properties

    /**
     * @var Farmer
     *
     */
    public $farmer;
    /**
     * @var array contract
     */
    public $data;

    /**
     * @var FarmersRepository
     */
    private $repository;

    /**
     * @var TobaccoPriceRepository
     */
    private $tobacoPriceRepository;

    /**
     * @var string
     */
    private $pdfsDirectory;

    /**
     * @var
     */
    private $contracts;

    /**
     * GeneratePDF constructor.
     * @param array $data
     * @param ContractsRepository $repository
     * @param TobaccoPriceRepository $tobaccoPriceRepository
     */
    public function __construct(
        array $data,
        FarmersRepository $repository,
        TobaccoPriceRepository $tobaccoPriceRepository
    )
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->tobacoPriceRepository = $tobaccoPriceRepository;
        $this->pdfsDirectory = public_path('downloads/pdfs/');
    }

    #endregion

    /**
     * @return string
     * @throws MpdfException
     */
    public function handle()
    {
        $farmer = $this->repository->find($this->data['id']);

        $uuid = uniqid();
        $fileName = $uuid . '.pdf';
        $outputDirectory = $this->pdfsDirectory . $fileName;

        if ($farmer) {
            $this->farmer = $farmer;
            $this->contracts = $this->farmer->contracts;
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
        $mpdf->autoPageBreak = true;

        $this->initializePDFsContainerFolder();
        $data = $this->collectContractData();

        $mpdf->WriteHTML(view('templates.tabacosj.v1.farmer-contracts', $data)->__toString());

        return $mpdf;
    }

    /**
     * @return array
     */
    private function collectContractData(): array
    {
        return [
            'farmer' => $this->farmer,
            'contracts' => $this->farmer->contracts,
            'farms' => $this->farmsFarmer(),
            'data' => $this->contractsData(),
            'purchase_budget' => $this->purchaseBudget(),
            'basic_expenses' => $this->Expenses(true),
            'other_expenses' => $this->Expenses(false),
            'areThereGathering' => $this->areThereGathering(),
            'classes_tp' => $this->classesHarvest('TP'),
            'classes_by' => $this->classesHarvest('BY')
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

    private function farmsFarmer()
    {
        $farms = $this->farmer->getFarms;
        $area = 0;
        $properties = '';
        $recordsNumbers = '';
        $date = '';
        for ($i = 0; $i < count($farms); $i++) {
            $area += $farms[$i]->total_area;
            $i + 1 < count($farms) ? $properties = $properties . collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.property_types'))->where('code', $farms[$i]->possesion_type_code)->first()['name'] . 'y ' : $properties = $properties . collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.property_types'))->where('code', $farms[$i]->possesion_type_code)->first()['name'] . '';
            $i + 1 < count($farms) ? $recordsNumbers = $recordsNumbers . $farms[$i]->record_number . 'y ' : $recordsNumbers = $recordsNumbers . $farms[$i]->record_number . '';
            $i + 1 < count($farms) ? $date = $date . $farms[$i]->activation_date . 'y ' : $date = $date . $farms[$i]->activation_date . '';
        }

        return $farmsToResult = [
            'area' => $area,
            'properties' => $properties,
            'records_number' => $recordsNumbers,
            'date' => $date
        ];

    }

    private function contractsData()
    {
        $contracts = $this->contracts;
        $results = [];


        foreach ($contracts as $contract) {

            if ($contract->tobacco_type != Enums::TOBACCO_TYPE[0] && $contract->tobacco_type != Enums::TOBACCO_TYPE[4]) {

                $contract->tobacco_type != Enums::TOBACCO_TYPE[3] && $contract->export_porcentage > 80 ? $export_percentage = 80 : $export_percentage = $contract->export_porcentage;
                $contract->tobacco_type == Enums::TOBACCO_TYPE[3] && $contract->export_porcentage > 80 ? $export_percentage = 80 : $export_percentage = $contract->export_porcentage;

                if (!isset($results[$contract->tobacco_type])) {
                    $results[$contract->tobacco_type] = [
                        'sale' => $this->tobacoPriceRepository->getEntity()->where('percent', $export_percentage)->where('tobacco_type_code', $contract->tobacco_type)->get()[0]['price'] * 46,
                        'gather' => $contract->production * $this->tobacoPriceRepository->getEntity()->where('percent', $export_percentage)->where('tobacco_type_code', $contract->tobacco_type)->get()[0]['price'] * 46

                    ];

                } else {
                    $results[$contract->tobacco_type]['sale'] = $results[$contract->tobacco_type]['sale'] + ($this->tobacoPriceRepository->getEntity()->where('percent', $export_percentage)
                                ->where('tobacco_type_code', $contract->tobacco_type)->get()[0]['price'] * 46);
                    $results[$contract->tobacco_type]['gather'] = $results[$contract->tobacco_type]['gather'] + $contract->production * $results[$contract->tobacco_type]['sale'];
                }

            } else {

                $gathers = $contract->tobaccoClassSchedules;
                /*$saleValue = 0;*/
                $gatherValue = 0;

                foreach ($gathers as $gather) {
                    /*$saleValue += $gather->price;*/
                    $gatherValue += ($gather->price * $gather->amount);
                }


                if (!isset($results[$contract->tobacco_type])) {
                    $results[$contract->tobacco_type] = [
                        'sale' => $gatherValue / ($contract->production),
                        'gather' => $gatherValue
                    ];
                } else {
                    $results[$contract->tobacco_type]['sale'] = $results[$contract->tobacco_type]['sale'] + $saleValue;
                    $results[$contract->tobacco_type]['gather'] = $results[$contract->tobacco_type]['gather'] + $gatherValue;
                }

            }
        }
        return $results;

    }

    private function purchaseBudget()
    {

        $contracts = $this->contracts;
        $results = [];


        foreach ($contracts as $contract) {

            $purchase_budget = 0;
            foreach ($contract->products as $product)
                $purchase_budget += $product->amount * $product->price;

            $clBudget = 0;
            if ($contract->tobacco_type == Enums::TOBACCO_TYPE[0] || $contract->tobacco_type == Enums::TOBACCO_TYPE[4]) {
                foreach ($contract->tobaccoClassSchedules as $gatheringClass) {
                    if (($gatheringClass->tobaccoClass->type == 'EX' &&
                        ($gatheringClass->tobaccoClass->group == 01 || $gatheringClass->tobaccoClass->group == 02)) ||
                        ($contract->tobacco_type == Enums::TOBACCO_TYPE[4] && $gatheringClass->tobaccoClass->type == 'EX')
                    ) {
                        $clBudget += ($gatheringClass->amount * $gatheringClass->tobaccoClass->price * 0.036);
                    }
                }
            } elseif ($contract->tobacco_type != Enums::TOBACCO_TYPE[2] && $contract->tobacco_type != Enums::TOBACCO_TYPE[3]) {
                $contract->export_porcentage > 80 ? $export_percentage = 80 : $export_percentage = $contract->export_porcentage;

                $price = $this->tobacoPriceRepository->getEntity()->where('percent', $export_percentage)->where('tobacco_type_code', $contract->tobacco_type)->get()[0]['price'] * 46;

                $clBudget = $contract->production * $price * ($contract->export_porcentage / 100) * 0.036;

            }


            if (!isset($results[$contract->tobacco_type])) {
                $results[$contract->tobacco_type] = [
                    'cup' => $purchase_budget,
                    'cl' => $clBudget
                ];
            } else {
                $results[$contract->tobacco_type]['cup'] = $results[$contract->tobacco_type]['cup'] + $purchase_budget;
                $results[$contract->tobacco_type]['cl'] = $results[$contract->tobacco_type]['cl'] + $clBudget;
            }
        }

        return $results;
    }

    private function Expenses($basic)
    {
        $contracts = $this->contracts;
        $results = [];

        foreach ($contracts as $contract) {

            $products = $contract->products;
            foreach ($products as $product) {
                if ($basic) {
                    if ($product->basic && $product->product->category != 3) {
                        if (!isset($results[$product->product->name])) {
                            $results[$product->product->name] = [
                                'measurment_unit' => $product->measurement_unit,
                                'amoun' => $product->amount,
                                'price' => $product->price,
                                'amount' => $product->amount * $product->price,
                            ];
                        } else {
                            $results[$product->product->name]['amoun'] = $results[$product->product->name]['amoun'] + $product->amount;
                            $results[$product->product->name]['amount'] = $results[$product->product->name]['amount'] + $product->amount * $product->price;
                        }
                    } elseif ($product->product->category == 3) {
                        if (!isset($results['Fitosanitarios'])) {
                            $results['Fitosanitarios'] = [
                                'measurment_unit' => 'KG',
                                'amoun' => $product->amount,
                                'price' => 0,
                                'amount' => $product->amount * $product->price,
                            ];
                        } else {
                            $results['Fitosanitarios']['amoun'] = $results['Fitosanitarios']['amoun'] + $product->amount;
                            $results['Fitosanitarios']['amount'] = $results['Fitosanitarios']['amount'] + $product->amount * $product->price;
                        }
                    }


                } else {
                    if (!$product->basic) {
                        if (!isset($results[$product->product->name])) {
                            $results[$product->product->name] = [
                                'measurment_unit' => $product->measurement_unit,
                                'amoun' => $product->amount,
                                'price' => $product->price,
                                'amount' => $product->amount * $product->price,
                            ];
                        } else {
                            $results[$product->product->name]['amoun'] = $results[$product->product->name]['amoun'] + $product->amount;
                            $results[$product->product->name]['amount'] = $results[$product->product->name]['amount'] + $product->amount * $product->price;
                        }
                    }
                }
            }
        }

        return $results;
    }

    private function areThereGathering()
    {
        $contracts = $this->contracts;
        $count = 0;
        foreach ($contracts as $contract)
            $contract->tobacco_type == Enums::TOBACCO_TYPE[0] || $contract->tobacco_type == Enums::TOBACCO_TYPE[4] ? $count++ : $count;

        return $count > 0;
    }

    private function classesHarvest($tobaco_type)
    {
       $contracts = $this->contracts;
       $results = [];
       $index = 0;

       if ($this->areThereGathering()){
           foreach ($contracts as $contract){
               $classes = $contract->tobaccoClassSchedules;

               foreach ($classes as $class){
                   if ($class->tobaccoClass->tobacco_type == $tobaco_type){
                       $results[$index] = [
                           'type' => $class-> tobaccoClass->type,
                           'group' => $class-> tobaccoClass->group,
                           'name' => $class->tobaccoClass->name,
                           'price' => $class->tobaccoClass->price,
                           'amoun' => $class->amount,
                       ];
                       $index ++;
                   }
               }
           }
       }

       return $results;
    }
}