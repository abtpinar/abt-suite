<?php

namespace App\Jobs\Farms\ShowFarm;

use App\Data\Repositories\Contracts\FarmsRepository;
use App\Data\Transformers\FarmTransformer;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use App\Support\Constants;
use App\Jobs\Job;

class ShowFarm extends Job
{
    /**
     * The podcast instance.
     *
     * @var FarmsRepository $repository
     */
    protected $repository;

    /**
     *
     * @var array $data
     */
    public $data;

    /**
     *
     * @var Manager
     */
    private $manager;
    /**
     * Create a new job instance.
     *
     * @return void
     * @var array $data
     * @var Manager $manager
     * @var FarmsRepository $repository
     */
    public function __construct(FarmsRepository $repository, array $data, Manager $manager)
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->manager = $manager;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $entity = $this->repository->find($this->data['id']);
        
        if(!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }
        
        $this->manager->parseIncludes(
            'farmers'
        );
        $item = new Item($entity, app(FarmTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
