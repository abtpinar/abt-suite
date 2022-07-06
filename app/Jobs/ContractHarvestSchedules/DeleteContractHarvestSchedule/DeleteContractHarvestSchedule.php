<?php

namespace App\Jobs\ContractHarvestSchedules\DeleteContractHarvestSchedule;

use App\Data\Repositories\Contracts\ContractHarvestSchedulesRepository;
use App\Jobs\Job;

class DeleteContractHarvestSchedule extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ContractHarvestSchedulesRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractHarvestSchedulesRepository $repository
     */
    public function __construct(array $data, ContractHarvestSchedulesRepository $repository)
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
