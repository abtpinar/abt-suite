<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\CommunicationContract;
use App\Data\Repositories\Contracts\CommunicationContractsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class CommunicationContractsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var CommunicationContract
     */
    private $entity;

    /**
     * @param CommunicationContract $entity
     */
    public function __construct(CommunicationContract $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findCommunicationContracts()
    {
        $query = $this->getEntity()
            ->selectRaw('communication_contracts.*');

        $query = $this->buildCommunicationContractFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('communication_contracts.id', 'desc');
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
    private function buildCommunicationContractFilters($query)
    {
        if (Input::get('department')) {
            $query->where('communication_contracts.department', Input::get('department'));
        }

        return $query;
    }

}
