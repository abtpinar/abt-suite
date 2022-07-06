<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\CLPayment;
use App\Data\Repositories\Contracts\CLPaymentsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;
use mysql_xdevapi\Collection;

class CLPaymentsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var CLPayment
     */
    private $entity;

    /**
     * @param CLPayment $entity
     */
    public function __construct(CLPayment $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findCLPayments()
    {
        $query = $this->getEntity()
            ->selectRaw('cl_payments.*');

        $query = $this->buildCLPaymentFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('cl_payments.id', 'desc');
        }

        return $query->paginate(Input::get('size', Constants::PAGINATION_SIZE));
    }

    /**
     * @return Collection
     */
    public function recordsToExport()
    {
        $query = $this->getEntity()
            ->selectRaw("cl.farmer_name, cl.credit_card, cl_payment_items.amount")
            ->join('cl_payment_items', 'cl_payments.id', '=', 'cl_payment_items.cl_payment_id')
            ->join('cl', 'cl_payment_items.cl_id', '=', 'cl.id');
        
        $query = $this->buildCLPaymentFilters($query);

        $result = $query->orderBy('cl_payment_items.id', 'desc')->get();        

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
    private function buildCLPaymentFilters($query)
    {
        if (Input::get('id')) {
            $query->where('cl_payments.id', Input::get('id'));
        }

        if (Input::get('status')) {
            $query->where('cl_payments.status', Input::get('status'));
        }

        return $query;
    }

}
