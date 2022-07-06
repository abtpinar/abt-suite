<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\Contract;
use App\Data\Repositories\Contracts\ContractsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class ContractsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var Contract
     */
    private $entity;

    /**
     * @param Contract $entity
     */
    public function __construct(Contract $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findContracts()
    {
        $query = $this->getEntity()
            ->selectRaw('contracts.*');

        $query = $this->buildContractFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('contracts.id', 'desc');
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
     * @return Collection
     */
    public function recordsToExport()
    {
        $query = $this->getEntity()
            ->selectRaw(
                "
                contracts.id,
                (select concat_ws(' ',farmers.first_name, farmers.middle_name, farmers.last_name) as farmers from farmers where farmers.id = contracts.farmer_id),
                (select production_units.name as pu from production_units where production_units.id = contracts.production_unit_id),
                contracts.tobacco_type,
                contracts.planting_area,
                contracts.production,
                contracts.performance
            "
            );

        $query = $this->buildContractFilters($query);

        $result = $query->orderBy('contracts.id', 'ASC')->get();

        return $result;
    }

    /**
     * @param $query
     * @return mixed
     */
    private function buildContractFilters($query)
    {
        if (Input::get('code')) {
            $query->where('contracts.id', Input::get('code'));
        }

        if (Input::get('farmer_name')) {
            $query->leftJoin('farmers', 'contracts.farmer_id', 'farmers.id')->where('farmers.first_name', Input::get('farmer_name'))->get();
        }

        if (Input::get('state')) {
            $query->where('contracts.state', Input::get('state'))->get();
        }

        if (Input::get('unit')) {
            $query->where('contracts.production_unit_id', Input::get('unit'))->get();
        }

        return $query;
    }

    public function contractsValance()
    {
        $query = $this->getEntity()
            ->selectRaw(
                "
                (select production_units.name from production_units where production_units.id = contracts.production_unit_id) as unit,
                sum(contracts.planting_area) as area,
                SUM(contracts.production) / 21.73 as ton,
                (SUM(contracts.production) / 21.73) / SUM(contracts.planting_area) as performance,
                contracts.tobacco_type as tobacco
                "
            );

        $query = $this->buildContractFilters($query);

        $result = $query->groupBy('contracts.production_unit_id')
                        ->groupBy('contracts.tobacco_type')->get();

        return $result;
    }

}
