<?php

namespace App\Data\Transformers;

use App\Data\Entities\ContractProduct;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class ContractProductTransformer extends AbstractTransformer
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
     * @param ContractProduct $entity
     *
     * @return array
     */
    public function transform(ContractProduct $entity)
    {
        return [
            'id' => $entity->id,
            'amount' => $entity->amount,
            'price' => $entity->price,
            'measurement_unit' => $entity->measurement_unit,
            'basic' => $entity->basic,
            'contract_id' => $entity->contract_id,
            'product_id' => $entity->product_id
        ];
    }

}
