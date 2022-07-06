<?php

namespace App\Jobs\TobaccoClasses\EditTobaccoClass;

use App\Data\Entities\TobaccoClass;
use App\Data\Repositories\Contracts\TobaccoClassesRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditTobaccoClass extends Job
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
    public function __construct(
        array $data,
        TobaccoClassesRepository $repository
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
