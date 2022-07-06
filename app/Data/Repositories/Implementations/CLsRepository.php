<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\CL;
use App\Data\Repositories\Contracts\CLsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;
use mysql_xdevapi\Collection;

class CLsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var CL
     */
    private $entity;

    /**
     * @param CL $entity
     */
    public function __construct(CL $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findCLs()
    {
        $query = $this->getEntity()
            ->selectRaw('cl.*');

        $query = $this->buildCLFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('cl.id', 'desc');
        }

        return $query->paginate(Input::get('size', Constants::PAGINATION_SIZE));
    }

    /**
     * @return mixed
     */
    public function findUnits()
    {
        $query = $this->getEntity()
            ->selectRaw('cl.unit_id, cl.unit_name')
            ->groupBy('cl.unit_id', 'cl.unit_name')
            ->orderBy('cl.unit_name');

        return $query->paginate(Input::get('size', 50));
    }

    /**
     * @return Collection
     */
    public function recordsToExport()
    {
        $query = $this->getEntity()
            ->selectRaw(
                "
                cl.id,
                cl.farmer_name,
                cl.farmer_code,
                cl.unit_name,
                cl.tobacco_type,
                cl.status,
                cl.kilograms,
                cl.amount,
                cl.amount as cl,
                cl.amount as percent,
                cl.expense,
                cl.amount as cl_final,
                (select sum(cl_payment_items.amount) as pagado from cl_payment_items where cl_payment_items.cl_id = cl.id)
            "
            );
        
        $query = $this->buildCLFilters($query);

        $result = $query->orderBy('cl.id', 'desc')->get();        

        return $result;
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
    private function buildCLFilters($query)
    {
        if (Input::get('farmer_code')) {
            $query->where('cl.farmer_code', Input::get('farmer_code'));
        }

        if (Input::get('farmer_name')) {
            $query->where('cl.farmer_name', 'like', '%' . Input::get('farmer_name') . '%');
        }

        if (Input::get('unit')) {
            $query->where('cl.unit_id', Input::get('unit'));
        }
        
        if (Input::get('type')) {
            $query->where('cl.tobacco_type', Input::get('type'));
        } else {
            $query->where('cl.tobacco_type', '<>', 'U');
        }
        
        if (Input::get('status')) {
            $query->where('cl.status', Input::get('status'));
        }

        return $query;
    }


    public function findByFarmer($farmer_id, $type)
    {
        return $this->getEntity()
            ->where('farmer_id', '=', $farmer_id)
            ->where('tobacco_type', '=', $type)
            ->first();
    }


    public function findByUnit($unit_id)
    {
        return $this->getEntity()
            ->where('unit_id', '=', $unit_id)
            ->where('tobacco_type', '<>', 'U')
            ->get();
    }


    public function getOverview()
    {
        return 
        [
            $this->getEntity()
            ->selectRaw(
                "
                SUM(cl.amount * 3.8 / 100) as amount,
                COUNT(cl.farmer_id) as farmers,
                (SELECT SUM(cl_payment_items.amount) FROM cl_payment_items) as payment
                "
            )->where('cl.tobacco_type', '<>', 'U')->get(),
            $this->getEntity()
            ->selectRaw(
                "
                cl.unit_id, 
                cl.unit_name,
                (SUM(cl_payment_items.amount) * 100 / SUM(cl.amount)) as result
                ")
            ->leftJoin('cl_payment_items', 'cl.id', 'cl_payment_items.cl_id')
            ->groupBy('cl.unit_id', 'cl.unit_name')
            ->orderBy('result', 'desc')->get()
        ];
    }
}
