<?php

namespace App\Jobs\Sims\DeleteSim;

use App\Data\Repositories\Contracts\SimsRepository;
use App\Jobs\Job;

class DeleteSim extends Job
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
    public function __construct(array $data, SimsRepository $repository)
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
