<?php

namespace App\Data\Transformers;

use App\Data\Entities\CoOwner;

class CoOwnerTransformer extends AbstractTransformer
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'farms',
        'farmers',
    ];

    /**
     * Turn this item object into a generic array
     *
     * @param CoOwner
     * @return array
     */
    public function transform(CoOwner $entity)
    {
        return [
            'id' => $entity->id,
            'percent_owner' => $entity->percent_owner,
            'farm_id' => $entity->farm_id,
            'farmer_id' => $entity->farmer_id,
        ];
    }

    /**
     * Include Farm
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeFarms(CoOwner $entity)
    {
        $farm = $entity->getFarm;

        return $this->item($farm, new FarmTransformer);
    }

    /**
     * Include Farmer
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeFarmers(CoOwner $entity)
    {
        $farmer = $entity->getFarmer;

        return $this->item($farmer, new FarmerTransformer);
    }
}