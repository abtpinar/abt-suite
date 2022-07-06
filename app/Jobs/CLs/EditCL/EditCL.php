<?php

namespace App\Jobs\CLs\EditCL;

use App\Data\Entities\CL;
use App\Data\Repositories\Contracts\CLsRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditCL extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var CLsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param CLsRepository $repository
     */
    public function __construct(
        array $data,
        CLsRepository $repository
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
