<?php

namespace App\Jobs\CommunicationFiles\ShowCommunicationFile;

use App\Data\Repositories\Contracts\CommunicationFilesRepository;
use App\Data\Transformers\CommunicationFileTransformer;
use App\Jobs\Job;
use App\Support\Constants;
use League\Fractal\Manager;
use League\Fractal\Resource\Item;

class ShowCommunicationFile extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;

    /**
     * @var CommunicationFilesRepository
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
     * @param CommunicationFilesRepository $repository
     * @param Manager $manager
     */
    public function __construct(array $data, CommunicationFilesRepository $repository, Manager $manager)
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
                'communication_file_components',
            ]
        );
        $item = new Item($entity, app(CommunicationFileTransformer::class));

        return [
            'status' => Constants::RESPONSE_STATUS_SUCCESS,
            'response' => $this->manager->createData($item)->toArray()
        ];
    }
}
