<?php namespace App\Data\Transformers;

use App\Data\Entities\Role;

class RoleTransformer extends AbstractTransformer
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [];

    /**
     * Turn this item object into a generic array
     *
     * @param Role $entity
     *
     * @return array
     */
    public function transform(Role $entity)
    {
        return [
            'id' => $entity->id,
            'name' => $entity->name,
            'description' => $entity->description,
            'key' => $entity->key
        ];
    }
}
