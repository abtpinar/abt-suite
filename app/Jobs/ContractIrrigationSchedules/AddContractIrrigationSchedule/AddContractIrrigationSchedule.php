<?php

namespace App\Jobs\ContractIrrigationSchedules\AddContractIrrigationSchedule;

use App\Data\Repositories\Contracts\ContractIrrigationSchedulesRepository;
use App\Jobs\Job;
use ReflectionException;

class AddContractIrrigationSchedule extends Job
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
