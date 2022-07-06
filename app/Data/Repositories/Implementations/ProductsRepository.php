<?php

namespace App\Data\Repositories\Implementations;

use App\Data\Entities\AbstractEntity;
use App\Data\Entities\Product;
use App\Data\Repositories\Contracts\ProductsRepository as RepositoryInterface;
use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Support\Facades\Input;
use mysql_xdevapi\Collection;

class ProductsRepository extends AbstractRepository implements RepositoryInterface
{
    #region Constructor And Fields

    /**
     * @var Product
     */
    private $entity;

    /**
     * @param Product $entity
     */
    public function __construct(Product $entity)
    {
        $this->entity = $entity;
    }

    #endregion

    #region RepositoryInterface">

    /**
     * @return mixed
     */
    public function findProducts()
    {
        $query = $this->getEntity()
            ->selectRaw('products.*');

        $query = $this->buildProductFilters($query);

        if (Input::get('sort_field') && Input::get('sort_order')) {
            $sortField = Input::get('sort_field');
            $sortOrder = Input::get('sort_order');
            $query->orderBy($sortField, $sortOrder);
        } else {
            $query->orderBy('products.id', 'desc');
            $query->orderBy('products.category', 'asc');
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
    private function buildProductFilters($query)
    {
        if (Input::get('code')) {
            $query->where('products.code', Input::get('code'));
        }
        if (Input::get('name')) {
            $query->where('products.name', Input::get('name'));
        }
        if (Input::get('concept')) {
            $query->where('products.expense_concept', Input::get('concept'));
        }
        if (Input::get('concept_distinct')) {
            $query->where('products.expense_concept', '!=', Input::get('concept_distinct'));
        }

        return $query;
    }

    public function findProductsBE()
    {
        $query =  $this->getEntity()::all()->where('expense_concept', '=', 'CB');
        return $query;
    }

    /*public function findProductsOE();

    public function findProdcuctSE();*/
}
