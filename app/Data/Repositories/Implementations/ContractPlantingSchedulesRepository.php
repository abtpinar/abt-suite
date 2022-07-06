<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\ContractPlantingSchedule;
use App\Data\Repositories\Contracts\ContractPlantingSchedulesRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class ContractPlantingSchedulesRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var ContractPlantingSchedule
     */
    private $entity;

    /**
     * @param Contract $entity
     */
    public function __construct(ContractPlantingSchedule $entity)
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
