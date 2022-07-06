<?php

namespace App\Jobs\ContractProducts\DeleteContractProduct;

use App\Data\Repositories\Contracts\ContractProductsRepository;
use App\Jobs\Job;

class DeleteContractProduct extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ContractProductsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractProductsRepository $repository
     */
    public function __construct(array $data, ContractProductsRepository $repository)
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
