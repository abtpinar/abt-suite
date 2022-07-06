<?php

namespace App\Data\Transformers;

use App\Data\Entities\CommunicationFile;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class CommunicationFileTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'employee',
        'communication_file_components'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param CommunicationFile $entity
     *
     * @return array
     */
    public function transform(CommunicationFile $entity)
    {
        return [
            'id' => $entity->id,
            'version' => $entity->version,
            'origin' => $entity->origin,
            'state' => $entity->state,
            'activation_date' => $entity->activation_date,
            'employee_id' => $entity->employee_id
        ];
    }

    /**
     * @param CommunicationFile $entity
     * @return Item
     */
    public function includeEmployee(CommunicationFile $entity): Item
    {
        return $this->item($entity->employee, app(EmployeeTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Collection
     */
    public function includeCommunicationFileComponents(Contract $entity): Collection
    {
        return $this->collection($entity->components, app(CommunicationFileComponentTransformer::class));
    }

}
