<?php

namespace App\Data\Transformers;

use App\Data\Entities\TobaccoClass;
use League\Fractal\Resource\Collection;

class TobaccoClassTransformer extends AbstractTransformer
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
     * @param TobaccoClass $entity
     *
     * @return array
     */
    public function transform(TobaccoClass $entity)
    {
        return [
            'id' => $entity->id,
            'name' => $entity->name,
            'type' => $entity->type,
            'group' => $entity->group,
            'price' => $entity->price,
            'price_history' => $entity->price_history,
            'active' => $entity->active,
            'tobacco_type' => collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.tobacco_type'))->where('code', $entity->tobacco_type)->first(),
        ];
    }

}
