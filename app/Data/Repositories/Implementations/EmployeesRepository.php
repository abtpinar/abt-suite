<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\Employee;
use App\Data\Repositories\Contracts\EmployeesRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;

class EmployeesRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var Employee
     */
    private $entity;

    /**
     * @param Employee $entity
     */
    public function __construct(Employee $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findEmployees()
    {
        $query = $this->getEntity()
            ->selectRaw('employees.*');

        $query = $this->buildEmployeeFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('employees.updated_at', 'desc');
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
    private function buildEmployeeFilters($query)
    {
        if (Input::get('ids')) {
            $query->whereIn('employees.id', explode(',', Input::get('ids')));
        }

        if (Input::get('name')) {
            $query->whereRaw("CONCAT_WS(' ', employees.first_name, employees.middle_name, employees.last_name) LIKE '%" . Input::get('name') . "%'");
        }

        if (Input::get('code')) {
            $query->where('employees.code', Input::get('code'));
        }

        if (Input::get('unit')) {
            $query->where('employees.unit', Input::get('unit'));
        }

        return $query;
    }

}
