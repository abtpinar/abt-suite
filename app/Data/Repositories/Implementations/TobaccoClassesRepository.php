<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\TobaccoClass;
use App\Data\Repositories\Contracts\TobaccoClassesRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;
use Symfony\Component\Console\Input\InputOption;

class TobaccoClassesRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var TobaccoClass
     */
    private $entity;

    /**
     * @param TobaccoClass $entity
     */
    public function __construct(TobaccoClass $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findTobaccoClasses()
    {
        $query = $this->getEntity()
            ->selectRaw('tobacco_classes.*');

        $query = $this->buildTobaccoClasseFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('tobacco_classes.id', 'desc');
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
    private function buildTobaccoClasseFilters($query)
    {
        if (Input::get('name')) {
            $query->where('tobacco_classes.name', Input::get('name'));
        }

        if (Input::get('tobacco_type')){
            $query -> where('tobacco_classes.tobacco_type', Input::get('tobacco_type'));
        }

        return $query;
    }

}
