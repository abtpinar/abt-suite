<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\CLPaymentItem;
use App\Data\Repositories\Contracts\CLPaymentItemsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;
use mysql_xdevapi\Collection;

class CLPaymentItemsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var CLPaymentItem
     */
    private $entity;

    /**
     * @param CLPaymentItem $entity
     */
    public function __construct(CLPaymentItem $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findCLPaymentItems()
    {
        $query = $this->getEntity()
            ->selectRaw('cl_payment_items.*');

        $query = $this->buildCLPaymentItemFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('cl_payment_items.id', 'desc');
        }

        return $query->paginate(Input::get('size', Constants::PAGINATION_SIZE));
    }

    /**
     * @return Collection
     */
    public function recordsForExport()
    {
        return $this->getEntity()::all();
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
    private function buildCLPaymentItemFilters($query)
    {
        if (Input::get('status')) {
            $query->where('cl_payment_items.status', Input::get('status'));
        }

        return $query;
    }

}
