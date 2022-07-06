<?php

namespace App\Data\Transformers;

use App\Data\Entities\ContractTobaccoClassSchedule;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class ContractTobaccoClassScheduleTransformer extends AbstractTransformer
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
     * @param ContractTobaccoClassSchedule $entity
     *
     * @return array
     */
    public function transform(ContractTobaccoClassSchedule $entity)
    {
        return [
            'id' => $entity->id,
            'amount' => $entity->amount,
            'price' => $entity->price,
            'contract_id' => $entity->contract_id,
            'tobacco_class_id' => $entity->tobacco_class_id,
        ];
    }

}
