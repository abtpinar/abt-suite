<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\ContractIrrigationSchedule;
use App\Data\Repositories\Contracts\ContractIrrigationSchedulesRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class ContractIrrigationSchedulesRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var Contract
     */
    private $entity;

    /**
     * @param ContractIrrigationSchedule $entity
     */
    public function __construct(ContractIrrigationSchedule $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

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

}
