<?php

namespace App\Data\Transformers;

use App\Data\Entities\Product;
use League\Fractal\Resource\Collection;

class ProductTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param Product $entity
     *
     * @return array
     */
    public function transform(Product $entity)
    {
        return [
            'id' => $entity->id,
            'code' => $entity->code,
            'name' => $entity->name,
            'category' => $entity->category,
            'category_name' => collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.product_categories'))->where('code', $entity->category)->first(),
            'price' => $entity->price,
            'price_history' => $entity->price_history,
            'measurement_unit' => $entity->measurement_unit,
            'active' => $entity->active,
            'expense_concept' => $entity->expense_concept,
            'consumption_standard_tp' => $entity->consumption_standard_tp,
            'consumption_standard_v1' => $entity->consumption_standard_v1,
            'consumption_standard_v2' => $entity->consumption_standard_v2,
            'consumption_standard_sp' => $entity->consumption_standard_sp,
            'consumption_standard_by' => $entity->consumption_standard_by,
            'consumption_standard_vg' => $entity->consumption_standard_vg
        ];
    }

}
