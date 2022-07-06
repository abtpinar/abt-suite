<?php

namespace App\Data\Transformers;

use App\Data\Entities\CLPaymentItem;
use League\Fractal\Resource\Collection;

class CLPaymentItemTransformer extends AbstractTransformer
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
     * @param CLPaymentItem $entity
     *
     * @return array
     */
    public function transform(CLPaymentItem $entity)
    {
        return [
            'id' => $entity->id,
            'cl_id' => $entity->cl_id,
            'cl_payment_id' => $entity->cl_payment_id,
            'initial_amount' => $entity->initial_amount,
            'amount' => $entity->amount,
            'unit' => $entity->cl->unit_name
        ];
    }

}
