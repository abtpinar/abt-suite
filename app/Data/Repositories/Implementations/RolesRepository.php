<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\Role;
use App\Data\Repositories\Contracts\RolesRepository as RepositoryInterface;
use App\Support\Constants;
use Illuminate\Support\Facades\Input;

class RolesRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var Role
     */
    private $entity;

    /**
     * @param Role $entity
     */
    public function __construct(Role $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * Find a roles list paginated, filtering by name and description.
     *
     * @return mixed
     */
    public function findRoles()
    {
        return $this->getEntity()
            ->selectRaw('roles.*')
            ->where('name', 'LIKE', '%' . Input::get('name') . '%')
            ->where('description', 'LIKE', '%' . Input::get('description') . '%')
            ->paginate(Input::get('size', Constants::PAGINATION_SIZE));
    }

    /**
     * @return AbstractEntity
     */
    public function getEntity()
    {
        return $this->entity;
    }

    #endregion

    /**
     * @param AbstractEntity $entity
     * @return void
     */
    public function setEntity(AbstractEntity $entity)
    {
        $this->entity = $entity;
    }
}