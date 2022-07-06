<?php

namespace App\Jobs\CommunicationContracts\DeleteCommunicationContract;

use App\Data\Repositories\Contracts\CommunicationContractsRepository;
use App\Jobs\Job;

class DeleteCommunicationContract extends Job
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
     * Execute the job.
     *
     * @return mixed
     */
    public function handle()
    {
        $entity = $this->repository->delete($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "delete");
    }
}
