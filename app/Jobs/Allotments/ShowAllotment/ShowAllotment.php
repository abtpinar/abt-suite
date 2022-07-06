<?php

namespace App\Jobs\Allotments\ShowAllotment;

use App\Jobs\Job;
use App\Data\Repositories\Contracts\AllotmentsRepository;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;
use App\Support\Constants;
use App\Data\Transformers\AllotmentTransformer;

class ShowAllotment extends Job
{
    /**
     * The podcast instance.
     *
     * @var AllotmentsRepository
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
     * @return void
     */
    public function __construct(AllotmentsRepository $repository, array $data, Manager $manager)
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->manager = $manager;
    }

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

        $this->manager->parseIncludes([
            'farms'
        ]);
        $item = new Item($entity, app(AllotmentTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
