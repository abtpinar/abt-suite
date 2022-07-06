<?php

namespace App\Jobs\Contracts\AddContract;

use App\Data\Entities\Contract;
use App\Data\Entities\ContractHarvestSchedule;
use App\Data\Entities\ContractIrrigationSchedule;
use App\Data\Entities\ContractPlantingSchedule;
use App\Data\Entities\ContractProduct;
use App\Data\Repositories\Contracts\ContractsRepository;
use App\Data\Repositories\Contracts\ProductsRepository;
use App\Jobs\Job;
use ReflectionException;

class AddContract extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ContractsRepository
     */
    private $repository;

    /**
     * @var ProductsRepository
     */
    private $productRepository;

    const Irrigation = 'Irrigation';
    const Harvest = 'Harvest';

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractsRepository $repository
     */
    public
    function __construct(array $data, ContractsRepository $repository, ProductsRepository $productsRepository)
    {
        $this->repository = $repository;
        $this->productRepository = $productsRepository;
        $this->data = $data;
    }

#endregion

    /**
     * @return array
     * @throws ReflectionException
     */
    public
    function handle()
    {
        try{

            $entity = $this->repository->add($this->data, false);

            if ($entity) {
                $this->handleBasicExpense($entity);

            }

            if (!empty($this->data['contract_planting_schedules'])) {
                $entity->plantingSchedules()->createMany($this->data['contract_planting_schedules']);
                $this -> handleIrrigationSchedules($entity);
                $this -> handleHarvestSchedules($entity);
            }

            /*if (!empty($this->data['contract_irrigation_schedules'])) {
                $entity->irrigationSchedules()->createMany($this->data['contract_irrigation_schedules']);
            }

            if (!empty($this->data['contract_harvest_schedules'])) {
                $entity->harvestSchedules()->createMany($this->data['contract_harvest_schedules']);
            }*/

            if (!empty($this->data['contract_tobacco_class_schedules'])) {
                $entity->tobaccoClassSchedules()->createMany($this->data['contract_tobacco_class_schedules']);
            }

            if (!empty($this->data['contract_products'])) {
                $entity->products()->createMany($this->data['contract_products']);
            }

            return $this->generateReturn($entity, $this->data, "add");

        }catch (\Exception $exception){
            /*return $this->apiFormattedResponse(
                Constants::RESPONSE_STATUS_ERROR,
                Constants::RESPONSE_HTTP_CODE_ERROR,
                ['Something is wrong, try again!'],
                null,
                Constants::RESPONSE_HTTP_CODE_ERROR
            );*/
            /*if (!$entity) {*/
                return $this->defaultDatabaseErrorResponse();
            /*}*/
        }
    }

    public
    function handleBasicExpense(Contract $contract)
    {
        $productsBE = $this->prepareBasicExpense();
        $consumptionField = 'consumption_standard_' . strtolower($contract->tobacco_type);

        foreach ($productsBE as $be) {

            if (!empty($be->$consumptionField)) {
                ContractProduct::create([
                    'amount' => $be->$consumptionField * $contract->planting_area,
                    'price' => $be->price,
                    'measurement_unit' => $be->measurement_unit,
                    'basic' => true,
                    'contract_id' => $contract->id,
                    'product_id' => $be->id
                ]);
            }
        }
    }

    public function handleIrrigationSchedules(Contract $contract)
    {
        $_plantingSchedules = $contract->plantingSchedules;

        foreach ($_plantingSchedules as $plantingSchedule) {
            if ($plantingSchedule -> amount_p1 > 0){
            ContractIrrigationSchedule::create([
                'tobacco_family' => $plantingSchedule->tobacco_family,
                'month' => $this-> calculate_month_tens($plantingSchedule-> month, 1, self::Irrigation)['month'],
                'amount_p1' => 0,
                'amount_p2'=> 0,
                'amount_p3'=> round($plantingSchedule -> amount_p1 * 20 / 300, 2),
                'contract_id' => $contract -> id
            ]);
            }
            if ($plantingSchedule -> amount_p2 > 0 || $plantingSchedule -> amount_p3 > 0){
                ContractIrrigationSchedule::create([
                    'tobacco_family' => $plantingSchedule->tobacco_family,
                    'month' => $this-> calculate_month_tens($plantingSchedule-> month, 2, self::Irrigation)['month'],
                    'amount_p1' => round($plantingSchedule -> amount_p2  * 20 / 300, 2),
                    'amount_p2'=> round($plantingSchedule -> amount_p3  * 20 / 300, 2),
                    'amount_p3'=> 0,
                    'contract_id' => $contract -> id
                ]);
            }
        }
    }

    public function handleHarvestSchedules(Contract $contract)
    {
        $_plantingSchedules = $contract->plantingSchedules;

        foreach ($_plantingSchedules as $plantingSchedule) {
            if ($plantingSchedule -> amount_p1 > 0 || $plantingSchedule -> amount_p2 > 0){
                ContractHarvestSchedule::create([
                    'tobacco_family' => $plantingSchedule->tobacco_family,
                    'month' => $this-> calculate_month_tens($plantingSchedule-> month, 1, self::Harvest)['month'],
                    'amount_p1' => 0,
                    'amount_p2'=> round($plantingSchedule -> amount_p1 * $contract -> performance, 2),
                    'amount_p3'=> round($plantingSchedule -> amount_p2 * $contract -> performance, 2),
                    'contract_id' => $contract -> id
                ]);
            }
            if ($plantingSchedule -> amount_p3 > 0){
                ContractHarvestSchedule::create([
                    'tobacco_family' => $plantingSchedule->tobacco_family,
                    'month' => $this-> calculate_month_tens($plantingSchedule-> month, 2, self::Harvest)['month'],
                    'amount_p1' => round($plantingSchedule -> amount_p3 * $contract -> performance, 2),
                    'amount_p2'=> 0,
                    'amount_p3'=> 0,
                    'contract_id' => $contract -> id
                ]);
            }
        }
    }

    public function prepareBasicExpense()
    {
        return $this->productRepository->findProductsBE();
    }

    /**
     * @param $month
     * @param $tens
     * @param $harvesType
     */
    public function calculate_month_tens($month, $tens, $scheduleType)
    {
        switch ($scheduleType) {

            case self::Harvest:
                $month + intdiv(13, 3) > 12 ? $_month = $month + intdiv(13, 3) - 12 : $month + intdiv(13, 3);
                $_tens = 13 % 3;
                if ($_tens + $tens < 3) {
                    $_tens += $tens;
                } else {
                    $_tens = $_tens - 3;
                    $_month += 1;
                };
                break;

            case self::Irrigation:
                $month - intdiv(5, 3) > 0 ? $_month = $month - intdiv(5, 3) : $_month = 12;
                $_tens = 5 % 3;
                if ($_tens + $tens < 3) {
                    $_tens += $tens;
                } else {
                    $_tens = $_tens - 3;
                    $_month -= 1;
                };
                break;
        }

        return array('month' => $_month, 'tens' => $_tens);
    }

}
