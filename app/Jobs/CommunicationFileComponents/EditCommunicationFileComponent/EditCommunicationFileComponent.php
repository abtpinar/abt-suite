<?php

namespace App\Jobs\CommunicationFileComponents\EditCommunicationFileComponent;

use App\Data\Entities\CommunicationFileComponent;
use App\Data\Repositories\Contracts\CommunicationFileComponentsRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditCommunicationFileComponent extends Job
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
    public function __construct(
        array $data,
        CommunicationFileComponentsRepository $repository
    ) {
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
        $entity = $this->repository->edit($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "edit");
    }

}
