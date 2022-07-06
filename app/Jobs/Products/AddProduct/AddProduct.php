<?php

namespace App\Jobs\Products\AddProduct;

use App\Data\Repositories\Contracts\ProductsRepository;
use App\Jobs\Job;
use ReflectionException;

class AddProduct extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ProductsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ProductsRepository $repository
     */
    public function __construct(array $data, ProductsRepository $repository)
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
