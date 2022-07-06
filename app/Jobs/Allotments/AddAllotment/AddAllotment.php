<?php

namespace App\Jobs\Allotments\AddAllotment;

use App\Jobs\Job;
use App\Data\Repositories\Contracts\AllotmentsRepository;

class AddAllotment extends Job
{

    /**
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
     * @param array $data
     * @param FarmersRepository $repository
     */
    public function __construct(array $data, AllotmentsRepository $repository)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    /**
     * @return array
     * @throws ReflectionException
     */
    public function handle(): array
    {
        $entity = $this->repository->add($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "add");
    }
}
