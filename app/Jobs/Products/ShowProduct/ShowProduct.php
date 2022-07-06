<?php

namespace App\Jobs\Products\ShowProduct;

use App\Data\Repositories\Contracts\ProductsRepository;
use App\Data\Transformers\ProductTransformer;
use App\Jobs\Job;
use App\Support\Constants;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;

class ShowProduct extends Job
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
     * @var Manager
     */
    private $manager;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ProductsRepository $repository
     * @param Manager $manager
     */
    public function __construct(array $data, ProductsRepository $repository, Manager $manager)
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->manager = $manager;
    }

    #endregion

    /**
     * Execute the job.
     *
     * @return mixed
     */
    public function handle()
    {
        $entity = $this->repository->find($this->data['id']);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        $this->manager->parseIncludes(
            []
        );
        $item = new Item($entity, app(ProductTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
