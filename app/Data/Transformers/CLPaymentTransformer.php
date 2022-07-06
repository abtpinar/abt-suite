<?php

namespace App\Data\Transformers;

use App\Data\Entities\CLPayment;
use League\Fractal\Resource\Collection;

class CLPaymentTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'cls'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param CLPayment $entity
     *
     * @return array
     */
    public function transform(CLPayment $entity)
    {
        return [
            'id' => $entity->id,
            'start_date' => $entity->start_date,
            'status' => $entity->status
        ];
    }

    /**
     * @param CL $entity
     * @return Collection
     */
    public function includeCLs(CLPayment $entity): Collection
    {
        return $this->collection($entity->cls, app(CLPaymentItemTransformer::class));
    }

}
