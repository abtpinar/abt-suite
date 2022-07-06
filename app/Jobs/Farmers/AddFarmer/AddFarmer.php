<?php

namespace App\Jobs\Farmers\AddFarmer;

use App\Data\Repositories\Contracts\FarmersRepository;
use App\Jobs\Job;
use ReflectionException;

class AddFarmer extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var FarmersRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param FarmersRepository $repository
     */
    public function __construct(array $data, FarmersRepository $repository)
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
