<?php

namespace App\Data\Transformers;

use App\Data\Entities\CL;
use League\Fractal\Resource\Collection;

class CLTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'payments'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param CL $entity
     *
     * @return array
     */
    public function transform(CL $entity)
    {
        return [
            'id' => $entity->id,
            'farmer_id' => $entity->farmer_id,
            'farmer_code' => $entity->farmer_code,
            'farmer_name' => $entity->farmer_name,
            'credit_card' => $entity->credit_card,
            'unit_id' => $entity->unit_id,
            'unit_name' => $entity->unit_name,
            'kilograms' => $entity->kilograms,
            'tobacco_type' => $entity->tobacco_type,
            'amount' => $entity->amount,
            'status' => $entity->status,
            'expense' => $entity->expense,
            'refunds' => $entity->refunds
        ];
    }

    /**
     * @param CL $entity
     * @return Collection
     */
    public function includePayments(CL $entity): Collection
    {
        return $this->collection($entity->payments, app(CLPaymentItemTransformer::class));
    }

}
