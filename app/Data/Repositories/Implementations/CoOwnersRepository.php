<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Repositories\Contracts\CoOwnersRepository as RepositoryInterface;
use App\Data\Entities\CoOwner;
use App\Data\Entities\AbstractEntity;
use Illuminate\Support\Facades\Input;
use App\Support\Constants;

class CoOwnersRepository extends AbstractRepository implements RepositoryInterface
{
    /**
     * @var CoOwner
     */
    private $entity;

    /**
     * @param CoOwner $entity
     */
    public function __construct(CoOwner $entity)
    {
        $this->entity = $entity;
    }

    /**
     * @return AbstractEntity
     */
    public function getEntity()
    {
        return $this->entity;
    }

    /**
     * @param AbstractEntity $entity
     * @return void
     */
    public function setEntity(AbstractEntity $entity)
    {
        $this->entity = $entity;
    }

    public function findCoOwners()
    {
        $query = $this->getEntity()
            ->selectRaw('co_owners.*');

        $query = $this->buildCoOwnerFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('co_owners.updated_at', 'desc');
        }

        return $query->paginate(Input::get('size', Constants::PAGINATION_SIZE));
    }

    /**
     * @param $query
     * @return mixed
     */
    private function buildCoOwnerFilters($query)
    {
        if (Input::get('ids')) {
            $query->whereIn('co_owners.id', explode(',', Input::get('ids')));
        }

        if (Input::get('number')) {
            $query->where($this->entity->getFarm->id, '=', Input::get('farm_id'));
        }

        if (Input::get('division')) {
            $query->where($this->entity->getFarmer->id, '=', Input::get('farmer_id'));
        }

        return $query;
    }

}