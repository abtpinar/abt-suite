<?php

namespace App\Jobs\CommunicationContracts\AddCommunicationContract;

use App\Data\Repositories\Contracts\CommunicationContractsRepository;
use App\Jobs\Job;
use ReflectionException;

class AddCommunicationContract extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var CommunicationContractsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param CommunicationContractsRepository $repository
     */
    public function __construct(array $data, CommunicationContractsRepository $repository)
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
