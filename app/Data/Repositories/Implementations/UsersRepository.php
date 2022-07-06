<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\User;
use App\Data\Repositories\Contracts\UsersRepository as RepositoryInterface;
use Illuminate\Support\Facades\Input;

class UsersRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var User
     */
    private $entity;

    /**
     * @param User $entity
     */
    public function __construct(User $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface

    
    /**
     * @return AbstractEntity
     */
    public function getEntity()
    {
        return $this->entity;
    }

    /**
     * @param AbstractEntity $entity
     *
     * @return void
     */
    public function setEntity(AbstractEntity $entity)
    {
        $this->entity = $entity;
    }

    /**
     * @param $passwordChangeKey
     * @param $data
     * @return null|string
     */
    public function enableUser($passwordChangeKey, $data)
    {
        $data['password_change_key'] = null;
        $data['password_change_date'] = null;
        $entity = $this->findByPasswordChangeKey($passwordChangeKey);

        if (!$entity) {
            return null;
        }

        $this->updateEntityData($entity, $data);
        $entity->password = $data['password'];

        if (!$entity->save()) {
            return 'Sorry, we could not save the data into the database.';
        }

        return $entity;
    }

    /**
     * @param string $passwordChangeKey
     * @return
     */
    public function findByPasswordChangeKey($passwordChangeKey)
    {
        return $this->getEntity()
            ->selectRaw('users.*')
            ->where('users.password_change_key', $passwordChangeKey)
            ->get()
            ->first();
    }

    #endregion

    /**
     * Find a users list paginated, filtering by first name, last name and email.
     *
     * @return mixed
     */
    public function findUsers()
    {
        $query = $this->getEntity()
            ->selectRaw('users.*')
            ->where('first_name', 'LIKE', '%' . Input::get('first_name') . '%')
            ->where('last_name', 'LIKE', '%' . Input::get('last_name') . '%')
            ->where('email', 'LIKE', '%' . Input::get('email') . '%');

        if (Input::get('active') != null) {
            $query->where('active', '=', Input::get('active'));
        }

        return $query->paginate(Input::get('size', 500));
    }


    public function findUserById($userId)
    {
        $query = $this->getEntity()
            ->select('users.*')->find($userId);
        return $query;
    }
}