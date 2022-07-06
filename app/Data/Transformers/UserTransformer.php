<?php namespace App\Data\Transformers;

use App\Data\Entities\User;

class UserTransformer extends AbstractTransformer
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'roles'
    ];

    /**
     * Turn this item object into a generic array
     *
     * @param User $entity
     *
     * @return array
     */
    public function transform(User $entity)
    {
        return [
            'id' => $entity->id,
            'first_name' => $entity->first_name,
            'last_name' => $entity->last_name,
            'full_name' => $entity->full_name,
            'email' => $entity->email,
            'phone' => $entity->phone,
            'picture' => $entity->picture,
            'active' => (bool)$entity->active
        ];
    }

    /**
     * @param User $entity
     * @return \League\Fractal\Resource\Collection
     */
    public function includeRoles(User $entity)
    {
        return $this->collection($entity->roles, app(RoleTransformer::class));
    }
}
