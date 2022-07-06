<?php

namespace App\Jobs\TobaccoClasses\ShowTobaccoClass;

use App\Data\Repositories\Contracts\TobaccoClassesRepository;
use App\Data\Transformers\TobaccoClassTransformer;
use App\Jobs\Job;
use App\Support\Constants;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;

class ShowTobaccoClass extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;

    /**
     * @var TobaccoClassesRepository
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
     * @param TobaccoClassesRepository $repository
     * @param Manager $manager
     */
    public function __construct(array $data, TobaccoClassesRepository $repository, Manager $manager)
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
        $item = new Item($entity, app(TobaccoClassTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
