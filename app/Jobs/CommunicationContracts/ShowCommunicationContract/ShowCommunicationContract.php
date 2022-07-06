<?php

namespace App\Jobs\CommunicationContracts\ShowCommunicationContract;

use App\Data\Repositories\Contracts\CommunicationContractsRepository;
use App\Data\Transformers\CommunicationContractTransformer;
use App\Jobs\Job;
use App\Support\Constants;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;

class ShowCommunicationContract extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;

    /**
     * @var CommunicationContractsRepository
     */
    private $repository;

    /**
     * @var Manager
     */
    private $manager;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param CommunicationContractsRepository $repository
     * @param Manager $manager
     */
    public function __construct(array $data, CommunicationContractsRepository $repository, Manager $manager)
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->manager = $manager;
    }

    #endregion

    /**
     * Execute the job.
     *
     * @return mixed
     */
    public function handle()
    {
        $entity = $this->repository->find($this->data['id']);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        $this->manager->parseIncludes(
            [
                'employee',
            ]
        );
        $item = new Item($entity, app(CommunicationContractTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
