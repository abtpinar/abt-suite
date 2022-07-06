<?php

namespace App\Jobs\CommunicationFiles\EditCommunicationFile;

use App\Data\Entities\CommunicationFile;
use App\Data\Repositories\Contracts\CommunicationFilesRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditCommunicationFile extends Job
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
    public function __construct(
        array $data,
        CommunicationFilesRepository $repository
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
