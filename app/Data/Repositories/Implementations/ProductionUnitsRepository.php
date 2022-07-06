<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\ProductionUnit;
use App\Data\Repositories\Contracts\ProductionUnitsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class ProductionUnitsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var ProductionUnit
     */
    private $entity;

    /**
     * @param ProductionUnit $entity
     */
    public function __construct(ProductionUnit $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findProductionUnits()
    {
        $query = $this->getEntity()
            ->selectRaw('production_units.*');

        $query = $this->buildProductionUnitFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('production_units.updated_at', 'desc');
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
    private function buildProductionUnitFilters($query)
    {
        if (Input::get('ids')) {
            $query->whereIn('production_units.id', explode(',', Input::get('ids')));
        }

        if (Input::get('name')) {
            $query->whereRaw("CONCAT_WS(' ', production_units.first_name, production_units.middle_name, production_units.last_name) LIKE '%" . Input::get('name') . "%'");
        }

        if (Input::get('code')) {
            $query->where('production_units.code', Input::get('code'));
        }

        if (Input::get('unit')) {
            $query->where('production_units.unit', Input::get('unit'));
        }

        return $query;
    }

}
