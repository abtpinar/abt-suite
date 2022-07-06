<?php

namespace App\Jobs\CLs\SetExpense;

use App\Data\Entities\CL;
use App\Data\Repositories\Contracts\CLsRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class SetExpense extends Job
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
     * @return array
     * @throws \ReflectionException
     */
    public function handle()
    {
        foreach($this->data['cls'] as $cl)
        {
            $newCL = $cl;            
            $newCL['status'] = 'FIXED_FEE';

            $result = $this->repository->edit($newCL);
        }

        return $this->apiOkResponse('Operation complete, god jobs.');
    }
    
}
