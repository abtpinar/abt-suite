<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Repositories\Contracts\FarmsRepository as RepositoryInterface;
use App\Data\Entities\Farm;
use App\Support\Constants;
use Illuminate\Support\Facades\Input;

class FarmsRepository extends AbstractRepository implements RepositoryInterface
{
    /**
     * @var Farm
     */
    private $entity;

    /**
     * @param Farm $entity
     */
    public function __construct(Farm $entity)
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

    public function findFarms()
    {
        $query = $this->getEntity()
            ->selectRaw('farms.*');

        $query = $this->buildFarmFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('farms.updated_at', 'desc');
        }

        return $query->paginate(Input::get('size', Constants::PAGINATION_SIZE));
    }

    /**
     * @param $query
     * @return mixed
     */
    private function buildFarmFilters($query)
    {
        if (Input::get('ids')) {
            $query->whereIn('farms.id', explode(',', Input::get('ids')));
        }
        if(Input::get('record_number')){
            $query->where('farms.record_number', Input::get('record_number'));
        }
        if(Input::get('farmer_name')){
            $query->leftJoin('farmers', 'farms.farmer_id', 'farmers.id')->where('farmers.first_name', Input::get('farmer_name'));
        }
        if(Input::get('unit')){
            $query->leftjoin('farmers', 'farms.farmer_id', 'farmers.id')->where('farmers.production_unit_id', Input::get('unit'))->get();
        }

        return $query;
    }
}