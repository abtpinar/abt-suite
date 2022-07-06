<?php

namespace App\Jobs\ContractIrrigationSchedules\DeleteContractIrrigationSchedule;

use App\Data\Repositories\Contracts\ContractIrrigationSchedulesRepository;
use App\Jobs\Job;

class DeleteContractIrrigationSchedule extends Job
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
    public function __construct(array $data, ContractIrrigationSchedulesRepository $repository)
    {
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
        $entity = $this->repository->delete($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "delete");
    }
}
