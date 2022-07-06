<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\CommunicationFile;
use App\Data\Repositories\Contracts\CommunicationFilesRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class CommunicationFilesRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var CommunicationFile
     */
    private $entity;

    /**
     * @param CommunicationFile $entity
     */
    public function __construct(CommunicationFile $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findCommunicationFiles()
    {
        $query = $this->getEntity()
            ->selectRaw('communication_files.*');

        $query = $this->buildCommunicationFileFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('communication_files.id', 'desc');
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
    private function buildCommunicationFileFilters($query)
    {
        if (Input::get('department')) {
            $query->where('communication_files.department', Input::get('department'));
        }

        return $query;
    }

}
