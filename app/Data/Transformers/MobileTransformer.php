<?php

namespace App\Data\Transformers;

use App\Data\Entities\Mobile;
use League\Fractal\Resource\Collection;

class MobileTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'mobile_model'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param Mobile $entity
     *
     * @return array
     */
    public function transform(Mobile $entity)
    {
        return [
            'id' => $entity->id,
            'mac' => $entity->mac,
            'imei' => $entity->imei,
            'imei2' => $entity->imei2,
            'mobile_model_id' => $entity->mobile_model_id
        ];
    }

    /**
     * @param Mobile $entity
     */
    public function includeMobileModel(Mobile $entity)
    {
        return $this->item($entity->mobileModel, app(MobileModelTransformer::class));
    }

}
