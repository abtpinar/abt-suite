<?php

namespace App\Jobs\Contracts\GenerateContractsValancePDF\Resolvers;


use App\Data\Entities\ClosedContract;
use App\Data\Entities\Contract;
use App\Data\Entities\TobaccoPrice;
use App\Data\Repositories\Contracts\ContractsRepository;
use App\Data\Repositories\Contracts\FarmersRepository;
use App\Helpers\ContractsHelper;
use App\Helpers\FormatHelper;
use App\Jobs\Job;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Mpdf\Mpdf;
use Mpdf\MpdfException;

class ContractsValanceGeneratePDF extends Job
{
    #region Constructor and Properties

    /**
     * @var array contract
     */
    public $contracts;

    /**
     * @var ContractsRepository
     */
    private $repository;

    /**
     * @var FarmersRepository
     */
    private $farmersRepository;

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

        ContractsRepository $repository,
        FarmersRepository $farmersRepository
    )
    {
        $this->repository = $repository;
        $this->farmersRepository = $farmersRepository;
        $this->pdfsDirectory = public_path('downloads/pdfs/');
    }

    #endregion

    /**
     * @return string
     * @throws MpdfException
     */
    public function handle()
    {
        $contracts = $this->repository->all();
        /*return $contract; exit();*/
        $uuid = uniqid();
        $fileName = $uuid . '.pdf';
        $outputDirectory = $this->pdfsDirectory . $fileName;

        if ($contracts) {
            $this->contracts = $contracts;
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
                'orientation' => 'L',
                'use_kwt' => true
            ]
        );
        $mpdf->SetDisplayMode('fullpage');

        $this->initializePDFsContainerFolder();
        $data = $this->collectContractData();
        $footer = '<div class="tc" style="font-size: 8px;"><strong>Km 2 1/2 Carretera Luis Lazo, Pinar del Río, Pinar del Río, Cuba. Tel.: +53 48703153</strong></div>';
        $mpdf->autoPageBreak = true;
        $mpdf->SetHTMLFooter($footer);

        $mpdf->WriteHTML(view('templates.tabacosj.v1.contracts-valance', $data)->__toString());

        return $mpdf;
    }

    /**
     * @return array
     */
    private function collectContractData(): array
    {


        return [
            'contracts' => $this->initializeData(),
            'excecution_contracts' => $this->executionContracts(),
            'total_area_to_contract' => 1900.00,
            'excecution_contracts_tobacco_type' => $this->executionContractsByTobaccoType(),
            'total_farmers' => $this->countFarmer(),
            'farmers_contracted' => $this->farmersContracted(),
            'total_area_tp' => 210,
            'total_area_v1' => 683,
            'total_area_v2' => 937,
            'total_area_sp' => 70,
            'total_area_by' => 0,
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

    public function initializeData()
    {
        $data = $this->repository->contractsValance();
        $result = [];
        foreach ($data as $dta) {
            if (!isset($result[$dta->unit])) {
                switch ($dta->tobacco) {
                    case 'V1':
                        $result[$dta->unit] = [
                            'area_v1' => $dta->area,
                            'ton_v1' => $dta->ton,
                            'performance_v1' => $dta->performance,
                            'area_v2' => 0,
                            'ton_v2' => 0,
                            'performance_v2' => 0,
                            'area_tp' => 0,
                            'ton_tp' => 0,
                            'performance_tp' => 0,
                            'area_sp' => 0,
                            'ton_sp' => 0,
                            'performance_sp' => 0,
                            'area_by' => 0,
                            'ton_by' => 0,
                            'performance_by' => 0,

                        ];
                        break;

                    case 'V2':
                        $result[$dta->unit] = [
                            'area_v1' => 0,
                            'ton_v1' => 0,
                            'performance_v1' => 0,
                            'area_v2' => $dta->area,
                            'ton_v2' => $dta->ton,
                            'performance_v2' => $dta->performance,
                            'area_tp' => 0,
                            'ton_tp' => 0,
                            'performance_tp' => 0,
                            'area_sp' => 0,
                            'ton_sp' => 0,
                            'performance_sp' => 0,
                            'area_by' => 0,
                            'ton_by' => 0,
                            'performance_by' => 0,

                        ];
                        break;

                    case 'TP':
                        $result[$dta->unit] = [
                            'area_v1' => 0,
                            'ton_v1' => 0,
                            'performance_v1' => 0,
                            'area_v2' => 0,
                            'ton_v2' => 0,
                            'performance_v2' => 0,
                            'area_tp' => $dta->area,
                            'ton_tp' => $dta->ton,
                            'performance_tp' => $dta->performance,
                            'area_sp' => 0,
                            'ton_sp' => 0,
                            'performance_sp' => 0,
                            'area_by' => 0,
                            'ton_by' => 0,
                            'performance_by' => 0,

                        ];
                        break;

                    case 'SP':
                        $result[$dta->unit] = [
                            'area_v1' => 0,
                            'ton_v1' => 0,
                            'performance_v1' => 0,
                            'area_v2' => 0,
                            'ton_v2' => 0,
                            'performance_v2' => 0,
                            'area_tp' => 0,
                            'ton_tp' => 0,
                            'performance_tp' => 0,
                            'area_sp' => $dta->area,
                            'ton_sp' => $dta->ton,
                            'performance_sp' => $dta->performance,
                            'area_by' => 0,
                            'ton_by' => 0,
                            'performance_by' => 0,

                        ];
                        break;

                    case 'BY':
                        $result[$dta->unit] = [
                            'area_v1' => 0,
                            'ton_v1' => 0,
                            'performance_v1' => 0,
                            'area_v2' => 0,
                            'ton_v2' => 0,
                            'performance_v2' => 0,
                            'area_tp' => 0,
                            'ton_tp' => 0,
                            'performance_tp' => 0,
                            'area_sp' => 0,
                            'ton_sp' => 0,
                            'performance_sp' => 0,
                            'area_by' => $dta->area,
                            'ton_by' => $dta->ton,
                            'performance_by' => $dta->performance,

                        ];
                        break;
                }

            } else {
                $result[$dta->unit]['area_' . strtolower($dta->tobacco)] = $result[$dta->unit]['area_' . strtolower($dta->tobacco)] + $dta->area;
                $result[$dta->unit]['ton_' . strtolower($dta->tobacco)] = $result[$dta->unit]['ton_' . strtolower($dta->tobacco)] + $dta->ton;
                $result[$dta->unit]['performance_' . strtolower($dta->tobacco)] = $result[$dta->unit]['performance_' . strtolower($dta->tobacco)] + $dta->performance;
            }

        }

        return $result;

    }

    public function executionContracts()
    {

        $execution_contracts = 0;

        foreach ($this->repository->all() as $contract)
            $execution_contracts += $contract->planting_area;

        return round($execution_contracts, 2);
    }

    public function executionContractsByTobaccoType()
    {

        $v1 = 0;
        $v2 = 0;
        $tp = 0;
        $sp = 0;
        $by = 0;

        $contracts = $this->repository->all();

        foreach ($contracts as $contract) {
            switch ($contract->tobacco_type) {

                case 'V1':
                    $v1 += $contract->planting_area;
                    break;

                case 'V2':
                    $v2 += $contract->planting_area;
                    break;

                case 'TP':
                    $tp += $contract->planting_area;
                    break;

                case 'SP':
                    $sp += $contract->planting_area;
                    break;

                case 'BY':
                    $by += $contract->planting_area;
                    break;
            }
        }

        return $result = [
            'v1' => $v1,
            'v2' => $v2,
            'tp' => $tp,
            'sp' => $sp,
            'by' => $by
        ];
    }

    private function countFarmer()
    {
        return count($this->farmersRepository->all());
    }

    private function farmersContracted()
    {
        $farmers = $this->farmersRepository->all();
        $count = 0;

        foreach ($farmers as $farmer){
            count($farmer->contracts) > 0 ? $count ++ : $count;
        }
        return $count;
    }
}