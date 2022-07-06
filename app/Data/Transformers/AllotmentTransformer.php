<?php

namespace App\Data\Transformers;

use App\Data\Entities\Allotment;

class AllotmentTransformer extends AbstractTransformer
{

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'farms'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @param Allotment
     * @return array
     */
    public function transform(Allotment $entity)
    {
        return [
            'id' => $entity->id,
            'area' => $entity->area,
            'number' => $entity->number,
            'division' => $entity->division,
            'usage_type_code' => $entity->usage_type_code,
            'usage_type' => $entity->getUsageType->toArray(),
            'farm_id' => $entity->farm_id,
        ];
    }

    /**
     * Include Farm
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeFarms(Allotment $entity)
    {
        $farm = $entity->getFarm;

        return $this->item($farm, new FarmTransformer);
    }



}