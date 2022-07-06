<?php

namespace App\Jobs\Farms\EditFarm;

use App\Jobs\Job;
use App\Data\Repositories\Contracts\FarmsRepository;

class EditFarm extends Job
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
     * @return void
     * @var array $data
     *
     * @var FarmsRepository $repository
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
        $entity = $this->repository->edit($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "edit");
    }
}
