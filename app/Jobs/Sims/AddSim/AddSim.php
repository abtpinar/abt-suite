<?php

namespace App\Jobs\Sims\AddSim;

use App\Data\Repositories\Contracts\SimsRepository;
use App\Jobs\Job;
use ReflectionException;

class AddSim extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var SimsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param SimsRepository $repository
     */
    public function __construct(
        array $data, 
        SimsRepository $repository
    )
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
