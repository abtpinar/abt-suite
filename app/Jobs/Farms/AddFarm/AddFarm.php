<?php

namespace App\Jobs\Farms\AddFarm;

use App\Jobs\Job;
use App\Data\Repositories\Contracts\FarmsRepository;

class AddFarm extends Job
{

    /**
     * The podcast instance.
     *
     * @var FarmsRepository $repository
     */
    private $repository;

    /**
     * 
     * @var array $data
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @var FarmsRepository $repository
     * @var array $data
     * 
     * @return void
     */
    public function __construct(FarmsRepository $repository, array $data)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
      $entity = $this->repository->add($this->data);
      
      if(!$entity){
       return $this->defaultDatabaseErrorResponse();   
      }

      if(!empty($this->data['allotments'])){
          $entity->getAllotments()->createMany($this->data['contract_planting_schedules']);
      }

        return $this->generateReturn($entity, $this->data, "add");
    }
}
