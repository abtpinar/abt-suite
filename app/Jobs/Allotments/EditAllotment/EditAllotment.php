<?php

namespace App\Jobs\Allotments\EditAllotment;

use App\Jobs\Job;
use App\Data\Repositories\Contracts\AllotmentsRepository;

class EditAllotment extends Job
{
    /**
     * The podcast instance.
     *
     * @var AllotmentsRepository
     */
    private $repository;

    /**
     * @var array
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(AllotmentsRepository $repository, array $data)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return mixed
     */
    public function handle()
    {
        $entity = $this->repository->edit($this->data);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "edit");
    }
}
