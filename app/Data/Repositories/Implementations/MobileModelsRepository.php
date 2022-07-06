<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\MobileModel;
use App\Data\Repositories\Contracts\MobileModelsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class MobileModelsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var MobileModel
     */
    private $entity;

    /**
     * @param MobileModel $entity
     */
    public function __construct(MobileModel $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findMobileModels()
    {
        $query = $this->getEntity()
            ->selectRaw('mobile_models.*');

        $query = $this->buildMobileModelFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('mobile_models.id', 'desc');
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
    private function buildMobileModelFilters($query)
    {
        if (Input::get('name')) {
            $query->where('mobile_models.name', Input::get('name'));
        }

        return $query;
    }

}
