<?php

namespace App\Jobs\ContractPlantingSchedules\AddContractPlantingSchedule;

use App\Data\Repositories\Contracts\ContractPlantingSchedulesRepository;
use App\Jobs\Job;
use ReflectionException;

class AddContractPlantingSchedule extends Job
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
    public function __construct(array $data, ContractPlantingSchedulesRepository $repository)
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
