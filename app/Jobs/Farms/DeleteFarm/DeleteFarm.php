<?php

namespace App\Jobs\Farms\DeleteFarm;

use App\Jobs\Job; 
use App\Data\Repositories\Contracts\FarmsRepository;


class DeleteFarm extends Job
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
     * Create a new job instance.
     *
     * @var FarmsRepository $repository
     * @var array $data
     *
     * @return void
     */
    public function __construct(FarmsRepository $repository, array $data)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $entity = $this->repository->delete($this->data);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "delete");
    }
}
