<?php

namespace App\Jobs\ContractPlantingSchedules\EditContractPlantingSchedule;

use App\Data\Entities\ContractPlantingSchedule;
use App\Data\Repositories\Contracts\ContractPlantingSchedulesRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditContractPlantingSchedule extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ContractPlantingSchedulesRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractPlantingSchedulesRepository $repository
     */
    public function __construct(
        array $data,
        ContractPlantingSchedulesRepository $repository
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
