<?php

namespace App\Jobs\Contracts\ShowContract;

use App\Data\Repositories\Contracts\ContractsRepository;
use App\Data\Transformers\ContractTransformer;
use App\Jobs\Job;
use App\Support\Constants;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;

class ShowContract extends Job
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
     * @var Manager
     */
    private $manager;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ContractsRepository $repository
     * @param Manager $manager
     */
    public function __construct(array $data, ContractsRepository $repository, Manager $manager)
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
            [
                'farmer', 
                'contract_planting_schedules', 
                'contract_irrigation_schedules', 
                'contract_harvest_schedules',
                'contract_tobacco_class_schedules',
                'contract_products'
            ]
        );
        $item = new Item($entity, app(ContractTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
