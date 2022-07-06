<?php

namespace App\Jobs\ContractIrrigationSchedules\EditContractIrrigationSchedule;

use App\Data\Entities\ContractIrrigationSchedule;
use App\Data\Repositories\Contracts\ContractIrrigationSchedulesRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditContractIrrigationSchedule extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ContractIrrigationSchedulesRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractIrrigationSchedulesRepository $repository
     */
    public function __construct(
        array $data,
        ContractIrrigationSchedulesRepository $repository
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

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "edit");
    }

}
