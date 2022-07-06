<?php

namespace App\Data\Transformers;

use App\Data\Entities\MobileModel;
use League\Fractal\Resource\Collection;

class MobileModelTransformer extends AbstractTransformer
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
     * @param MobileModel $entity
     *
     * @return array
     */
    public function transform(MobileModel $entity)
    {
        return [
            'id' => $entity->id,
            'name' => $entity->name,
            'mobile_brand_id' => $entity->mobile_brand_id,
            'brand_name' => $entity->brandName()
        ];
    }

}
