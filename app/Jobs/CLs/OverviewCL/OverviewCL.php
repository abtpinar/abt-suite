<?php

namespace App\Jobs\CLs\OverviewCL;

use App\Data\Repositories\Contracts\CLsRepository;
use App\Jobs\Job;
use App\Support\Constants;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class OverviewCL extends Job
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
     * @param array $data
     * @param CLsRepository $repository
     */
    public function __construct(array $data, CLsRepository $repository)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    #endregion

    /**
     * Execute the job.
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        $entity = $this->repository->getOverview();
        
        return $this->apiOkResponse(['data' => array_merge($entity[0]->toArray()[0], ['units'=>$entity[1]->toArray()])]);
    }
}
