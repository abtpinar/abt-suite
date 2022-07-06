<?php

namespace App\Jobs\ContractTobaccoClassSchedules\DeleteContractTobaccoClassSchedule;

use App\Data\Repositories\Contracts\ContractTobaccoClassSchedulesRepository;
use App\Jobs\Job;

class DeleteContractTobaccoClassSchedule extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ContractTobaccoClassSchedulesRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractTobaccoClassSchedulesRepository $repository
     */
    public function __construct(array $data, ContractTobaccoClassSchedulesRepository $repository)
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
