<?php

namespace App\Data\Transformers;

use App\Data\Entities\ProductionUnit;
use League\Fractal\Resource\Collection;

class ProductionUnitTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param ProductionUnit $entity
     *
     * @return array
     */
    public function transform(ProductionUnit $entity)
    {
        return [
            'id' => $entity->id,
            'code' => $entity->code,
            'name' => $entity->name,
            'address' => $entity->address,
            'president_name' => $entity->president_name,
            'president_agreement_number' => $entity->president_agreement_number,
            'bank' => $entity->bank,
            'bank_account' => $entity->bank_account,
            'active' => $entity->active
        ];
    }

}
