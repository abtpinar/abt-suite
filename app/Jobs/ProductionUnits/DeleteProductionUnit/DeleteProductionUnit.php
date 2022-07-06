<?php

namespace App\Jobs\ProductionUnits\DeleteProductionUnit;

use App\Data\Repositories\Contracts\ProductionUnitsRepository;
use App\Jobs\Job;

class DeleteProductionUnit extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var ProductionUnitsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param ProductionUnitsRepository $repository
     */
    public function __construct(array $data, ProductionUnitsRepository $repository)
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
