<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Repositories\Contracts\AllotmentsRepository as RepositoryInterface;
use App\Data\Entities\Allotment;
use App\Data\Entities\AbstractEntity;
use Illuminate\Support\Facades\Input;
use App\Support\Constants;

class AllotmentsRepository extends AbstractRepository implements RepositoryInterface
{

    /**
     * @var Allotment
     */
    private $entity;

    /**
     * @param Allotment $entity
     */
    public function __construct(Allotment $entity)
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

    public function findAllotments()
    {
        $query = $this->getEntity()
            ->selectRaw('allotments.*');

        $query = $this->buildAllotmentFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('allotments.updated_at', 'desc');
        }

        return $query->paginate(Input::get('size', Constants::PAGINATION_SIZE));
    }

    /**
     * @param $query
     * @return mixed
     */
    private function buildAllotmentFilters($query)
    {
        if (Input::get('ids')) {
            $query->whereIn('allotments.id', explode(',', Input::get('ids')));
        }
        
        if(Input::get('number')){
            $query->where($this->entity->area, '=', Input::get('number'));
        }

        if(Input::get('division')){
            $query->where($this->entity->division, '=', Input::get('division'));
        }
        
        if(Input::get('usage_type')){
            $query->where($this->entity->usage_type, 'like', '%'.Input::get('usage_type').'%');
        }
        return $query;
    }

}