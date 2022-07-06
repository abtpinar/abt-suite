<?php

namespace App\Jobs\CoOwners\ShowCoOwner;

use App\Data\Repositories\Contracts\CoOwnersRepository;
use App\Data\Transformers\CoOwnerTransformer;
use App\Jobs\Job;
use App\Support\Constants;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;

class ShowCoOwner extends Job
{
    /**
     * 
     * @var CoOwnersRepository
     */
    private $repository;

    /**
     * 
     * @var array
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
     * @var CoOwnersRepository
     * @var array
     * @var Manager
     * @return void
     */
    public function __construct(CoOwnersRepository $repository, array $data, Manager $manager)
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->manager = $manager;
    }

    /**
     * Execute the job.
     *
     * @return array
     */
    public function handle()
    {
        $entity = $this->repository->find($this->data['id']);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        $this->manager->parseIncludes([
            'farms',
            'farmers',
        ]);
        $item = new Item($entity, app(CoOwnerTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
