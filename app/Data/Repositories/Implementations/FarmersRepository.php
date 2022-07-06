<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\Farmer;
use App\Data\Repositories\Contracts\FarmersRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class FarmersRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var Farmer
     */
    private $entity;

    /**
     * @param Farmer $entity
     */
    public function __construct(Farmer $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findFarmers()
    {
        $query = $this->getEntity()
            ->selectRaw('farmers.*');

        $query = $this->buildFarmerFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('farmers.updated_at', 'desc');
        }

        return $query->paginate(Input::get('size', Constants::PAGINATION_SIZE));
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

    /**
     * @param $query
     * @return mixed
     */
    private function buildFarmerFilters($query)
    {
        if (Input::get('ids')) {
            $query->whereIn('farmers.id', explode(',', Input::get('ids')));
        }

        if (Input::get('first_name')) {
            $query->where('farmers.first_name', Input::get('first_name'));/*("CONCAT_WS(' ', farmers.first_name, farmers.middle_name, farmers.last_name) LIKE '%" . Input::get('name') . "%'");*/
        }
        if (Input::get('middle_name')) {
            $query->where('farmers.middle_name', Input::get('middle_name'));/*("CONCAT_WS(' ', farmers.first_name, farmers.middle_name, farmers.last_name) LIKE '%" . Input::get('name') . "%'");*/
        }
        if (Input::get('last_name')) {
            $query->where('farmers.last_name', Input::get('last_name'));/*("CONCAT_WS(' ', farmers.first_name, farmers.middle_name, farmers.last_name) LIKE '%" . Input::get('name') . "%'");*/
        }

        if (Input::get('code')) {
            $query->where('farmers.code', Input::get('code'));
        }

        if (Input::get('unit')) {
            $query->where('farmers.production_unit_id', Input::get('unit'));
        }

        return $query;
    }

}
