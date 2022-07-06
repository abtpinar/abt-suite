<?php

namespace App\Data\Transformers;

use App\Data\Entities\Sim;
use League\Fractal\Resource\Collection;

class SimTransformer extends AbstractTransformer
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
     * @param Sim $entity
     *
     * @return array
     */
    public function transform(Sim $entity)
    {
        return [
            'id' => $entity->id,
            'number' => $entity->number,
            'usim' => $entity->usim,
            'pin' => $entity->pin,
            'puk' => $entity->puk,
            'ip_address' => $entity->ip_address
        ];
    }

}
