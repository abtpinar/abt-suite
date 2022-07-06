<?php

namespace App\Jobs\Products\EditProduct;

use App\Data\Entities\Product;
use App\Data\Repositories\Contracts\ProductsRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditProduct extends Job
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
    public function __construct(
        array $data,
        ProductsRepository $repository
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
