<?php

namespace App\Jobs\Users\EditProfile;

use App\Data\Entities\AbstractEntity;
use App\Data\Repositories\Contracts\UsersRepository;
use App\Jobs\Job;

class EditProfile extends Job
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
        if (array_key_exists("roles", $this->data)) {
            unset($this->data["roles"]);
        }

        $entity = $this->repository->edit($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "edit");
    }

    /**
     * @param AbstractEntity $entity
     * @return mixed|string
     */
    protected function getEntityName(AbstractEntity $entity)
    {
        return 'Usuario';
    }
}
