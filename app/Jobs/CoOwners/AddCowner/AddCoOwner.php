<?php

namespace App\Jobs\CoOwners\AddCowner;



use App\Data\Repositories\Contracts\CoOwnersRepository;
use App\Jobs\Job;

class AddCoOwner extends Job
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
     * @throws \ReflectionException
     * @return array
     */
    public function handle()
    {
        $entity = $this->repository->add($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "add");
    }
}
