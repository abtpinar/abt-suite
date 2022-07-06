<?php

namespace App\Data\Transformers;

use App\Data\Entities\ContractIrrigationSchedule;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class ContractIrrigationScheduleTransformer extends AbstractTransformer
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
     * @param ContractIrrigationSchedule $entity
     *
     * @return array
     */
    public function transform(ContractIrrigationSchedule $entity)
    {
        return [
            'id' => $entity->id,
            'tobacco_family' => $entity->tobacco_family,
            'month' => $entity->month,
            'amount_p1' => $entity->amount_p1,
            'amount_p2' => $entity->amount_p2,
            'amount_p3' => $entity->amount_p3,
            'contract_id' => $entity->contract_id,
            'updated_at' => $entity->updated_at
        ];
    }

}
