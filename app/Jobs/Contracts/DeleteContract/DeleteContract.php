<?php

namespace App\Jobs\Contracts\DeleteContract;

use App\Data\Repositories\Contracts\ContractsRepository;
use App\Jobs\Job;

class DeleteContract extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ContractsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractsRepository $repository
     */
    public function __construct(array $data, ContractsRepository $repository)
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
