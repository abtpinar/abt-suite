<?php

namespace App\Jobs\Employees\AddEmployee;

use App\Data\Repositories\Contracts\EmployeesRepository;
use App\Jobs\Job;
use ReflectionException;

class AddEmployee extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var EmployeesRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param EmployeesRepository $repository
     */
    public function __construct(array $data, EmployeesRepository $repository)
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
