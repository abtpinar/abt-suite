<?php

namespace App\Data\Transformers;

use App\Data\Entities\Employee;
use League\Fractal\Resource\Collection;

class EmployeeTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'communication_contracts'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param Employee $entity
     *
     * @return array
     */
    public function transform(Employee $entity)
    {
        return [
            'id' => $entity->id,
            'dni' => $entity->dni,
            'first_name' => $entity->first_name,
            'middle_name' => $entity->middle_name,
            'last_name' => $entity->last_name,
            'picture' => $entity->picture,
            'department' => $entity->department,
            'occupation' => $entity->occupation,
            'active' => $entity->active
        ];
    }

    /**
     * @param Employee $entity
     * @return Collection
     */
    public function includeCommunicationContracts(Employee $entity): Collection
    {
        return $this->collection($entity->communicationContracts, app(CommunicationContractTransformer::class));
    }

}
