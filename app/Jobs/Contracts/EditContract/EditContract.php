<?php

namespace App\Jobs\Contracts\EditContract;

use App\Data\Entities\Contract;
use App\Data\Entities\ContractHarvestSchedule;
use App\Data\Entities\ContractIrrigationSchedule;
use App\Data\Repositories\Contracts\ContractsRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditContract extends Job
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

    const Irrigation = 'Irrigation';
    const Harvest = 'Harvest';

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractsRepository $repository
     */
    public function __construct(
        array $data,
        ContractsRepository $repository
    ) {
        $this->repository = $repository;
        $this->data = $data;
    }

    #endregion

    /**
     * Execute the job.
     *
     * @return mixed
     */
    public function handle()
    {
        $entity = $this->repository->edit($this->data, false);

        /*if ($entity && !empty($this->data['contract_planting_schedules'])) {
            $entity->plantingSchedules()->createMany($this->data['contract_planting_schedules']);
            $this -> handleIrrigationSchedules($entity);
            $this -> handleHarvestSchedules($entity);
        }*/

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "edit");
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
