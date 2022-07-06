<?php

namespace App\Jobs\ProductionUnits\ShowProductionUnit;

use App\Data\Repositories\Contracts\ProductionUnitsRepository;
use App\Data\Transformers\ProductionUnitTransformer;
use App\Jobs\Job;
use App\Support\Constants;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;

class ShowProductionUnit extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;

    /**
     * @var ProductionUnitsRepository
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
     * @param ProductionUnitsRepository $repository
     * @param Manager $manager
     */
    public function __construct(array $data, ProductionUnitsRepository $repository, Manager $manager)
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
        $item = new Item($entity, app(ProductionUnitTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
