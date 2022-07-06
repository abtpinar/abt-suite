<?php

namespace App\Jobs\CoOwners\DeleteCoOwner;



use App\Jobs\Job;
use App\Data\Repositories\Contracts\CoOwnersRepository;

class DeleteCoOwner extends Job
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
     * @return mixed
     */
    public function handle()
    {
        $entity = $this->repository->delete($this->data, false);
        
        if(!$entity){
            return $this->defaultDatabaseErrorResponse();
        }
        
        return $this->generateReturn($entity, $this->data, "delete");
    }
}
