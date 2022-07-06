<?php

namespace App\Jobs\CoOwners\EditCoOwner;

use App\Data\Repositories\Contracts\CoOwnersRepository;
use App\Jobs\Job;

class EditCoOwner extends Job
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
     * Create a new job instance.
     *
     * @var CoOwnersRepository
     * @var array
     * @return void
     */
    public function __construct(CoOwnersRepository $repository, array $data)
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
