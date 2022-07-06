<?php

namespace App\Data\Transformers;

use App\Data\Entities\CommunicationFileComponent;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class CommunicationFileComponentTransformer extends AbstractTransformer
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
     * @param CommunicationFileComponent $entity
     *
     * @return array
     */
    public function transform(CommunicationFileComponent $entity)
    {
        return [
            'id' => $entity->id,
            'maker' => $entity->maker,
            'model' => $entity->model, 
            'properties' => $entity->properties,
            'serial' => $entity->serial,
            'inventory' => $entity->inventory,
            'is_peripheral' => $entity->is_peripheral,
            'is_laptop' => $entity->is_laptop,
            'communication_file_id' => $entity->communication_file_id
        ];
    }

}
