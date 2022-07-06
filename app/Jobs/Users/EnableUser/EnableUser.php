<?php

namespace App\Jobs\Users\EnableUser;

use App\Data\Repositories\Contracts\UsersRepository;
use App\Jobs\Job;
use App\Support\Constants;

class EnableUser extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var UsersRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param UsersRepository $repository
     */
    public function __construct(array $data, UsersRepository $repository)
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
        $entity = $this->repository->enableUser($this->data['password_change_key'], $this->data);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return [
            "status" => Constants::RESPONSE_STATUS_SUCCESS,
            "response_code" => Constants::RESPONSE_CODE_SUCCESS,
            "response" => ['data' => $entity],
        ];
    }
}
