<?php

namespace App\Jobs\Farmers\EditFarmer;

use App\Data\Entities\Farmer;
use App\Data\Repositories\Contracts\FarmersRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class EditFarmer extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var FarmersRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param FarmersRepository $repository
     */
    public function __construct(
        array $data,
        FarmersRepository $repository
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
