<?php

namespace App\Jobs\Employees\EditEmployee;

use App\Data\Entities\Employee;
use App\Data\Repositories\Contracts\EmployeesRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditEmployee extends Job
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
    public function __construct(
        array $data,
        EmployeesRepository $repository
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
