<?php

namespace App\Jobs\CommunicationFiles\AddCommunicationFile;

use App\Data\Repositories\Contracts\CommunicationFilesRepository;
use App\Jobs\Job;
use ReflectionException;

class AddCommunicationFile extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var CommunicationFilesRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param CommunicationFilesRepository $repository
     */
    public function __construct(array $data, CommunicationFilesRepository $repository)
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

        if (!empty($this->data['communication_file_components'])) {
            $entity->components()->createMany($this->data['communication_file_components']);
        }

        return $this->generateReturn($entity, $this->data, "add");
    }
    
}
