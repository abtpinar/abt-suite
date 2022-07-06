<?php

namespace App\Data\Transformers;

use App\Data\Entities\MobileBrand;
use League\Fractal\Resource\Collection;

class MobileBrandTransformer extends AbstractTransformer
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
     * @param MobileBrand $entity
     *
     * @return array
     */
    public function transform(MobileBrand $entity)
    {
        return [
            'id' => $entity->id,
            'name' => $entity->name
        ];
    }

}
