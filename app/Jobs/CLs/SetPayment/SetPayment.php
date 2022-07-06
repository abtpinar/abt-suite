<?php

namespace App\Jobs\CLs\SetPayment;

use App\Data\Entities\CL;
use App\Data\Repositories\Contracts\CLsRepository;
use App\Data\Repositories\Contracts\CLPaymentsRepository;
use App\Jobs\Job;
use Carbon\Carbon;

class SetPayment extends Job
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
     * @var CLPaymentsRepository
     */
    private $paymentRepository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param CLsRepository $repository
     */
    public function __construct(
        array $data,
        CLsRepository $repository,
        CLPaymentsRepository $paymentRepository
    ) {
        $this->repository = $repository;
        $this->paymentRepository = $paymentRepository;
        $this->data = $data;
    }

    #endregion

    /**
     * @return array
     * @throws \ReflectionException
     */
    public function handle()
    {
        $entity = $this->paymentRepository->add($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        if (!empty($this->data['cls'])) {
            $entity->cls()->createMany($this->data['cls']);
        }

        $this->handleCLs();

        return $this->generateReturn($entity, $this->data, "add");
    }

    private function handleCLs()
    {
        foreach($this->data['cls'] as $cl)
        {
            $newCL['id'] = $cl['cl_id'];            
            $newCL['credit_card'] = $cl['credit_card'];            
            $newCL['status'] = number_format($cl['initial_amount'], 2, '.', '') * 1 > number_format($cl['amount'], 2, '.', '') * 1 ? 'PAID' : 'FINISHED';

            $result = $this->repository->edit($newCL);
        }
    }
    
}
