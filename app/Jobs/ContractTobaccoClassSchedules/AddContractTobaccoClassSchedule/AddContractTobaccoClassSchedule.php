<?php

namespace App\Jobs\ContractTobaccoClassSchedules\AddContractTobaccoClassSchedule;

use App\Data\Repositories\Contracts\ContractTobaccoClassSchedulesRepository;
use App\Jobs\Job;
use ReflectionException;

class AddContractTobaccoClassSchedule extends Job
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
     * @return array
     * @throws ReflectionException
     */
    public function handle(): array
    {
        $entity = $this->repository->add($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "add");
    }
    
}
