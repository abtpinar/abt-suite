<?php namespace App\Jobs\Users\AddUser;

use App\Data\Repositories\Contracts\UsersRepository;
use App\Helpers\FormatHelper;
use App\Jobs\Job;

class AddUser extends Job
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
        if (array_key_exists("password_confirmation", $this->data)) {
            unset($this->data["password_confirmation"]);
        }

        if (!array_key_exists("active", $this->data)) {
            $this->data["active"] = false;
        }

        $entity = $this->repository->add($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        $entity->first_name = FormatHelper::formattedStringToUppercase($this->data['first_name']);
        $entity->last_name = FormatHelper::formattedStringToUppercase($this->data['last_name']);
        $entity->save();

        if (array_key_exists('roles', $this->data)) {
            $entity->roles()->sync($this->data['roles']);
        }

        return $this->generateReturn($entity, $this->data, "add");
    }
}
