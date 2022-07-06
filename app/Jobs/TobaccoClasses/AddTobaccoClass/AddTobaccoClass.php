<?php

namespace App\Jobs\TobaccoClasses\AddTobaccoClass;

use App\Data\Repositories\Contracts\TobaccoClassesRepository;
use App\Jobs\Job;
use ReflectionException;

class AddTobaccoClass extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var TobaccoClassesRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param TobaccoClassesRepository $repository
     */
    public function __construct(array $data, TobaccoClassesRepository $repository)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    #endregion

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
