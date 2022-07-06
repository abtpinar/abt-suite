<?php

namespace App\Jobs\CommunicationFileComponents\AddCommunicationFileComponent;

use App\Data\Repositories\Contracts\CommunicationFileComponentsRepository;
use App\Jobs\Job;
use ReflectionException;

class AddCommunicationFileComponent extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var CommunicationFileComponentsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param CommunicationFileComponentsRepository $repository
     */
    public function __construct(array $data, CommunicationFileComponentsRepository $repository)
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
