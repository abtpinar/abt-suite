<?php

namespace App\Data\Transformers;

use App\Data\Entities\CommunicationContract;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class CommunicationContractTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'employee',
        'mobile_model',
        'sim'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param CommunicationContract $entity
     *
     * @return array
     */
    public function transform(CommunicationContract $entity)
    {
        return [
            'id' => $entity->id,
            'version' => $entity->version,
            'origin' => $entity->origin,
            'state' => $entity->state,
            'activation_date' => $entity->activation_date,
            'expiration_date' => $entity->expiration_date,
            'employee_id' => $entity->employee_id,
            'department' => $entity->department,
            'occupation' => $entity->occupation,
            'sim_id' => $entity->sim_id,
            'call_time' => $entity->call_time,
            'sms_credit' => $entity->sms_credit,
            'data_plan' => $entity->data_plan,
            'mobile_id' => $entity->mobile_id,
            'mobile_accesories' => $entity->mobile_accesories,
            'domain_access' => $entity->domain_access,
            'domain_user' => $entity->domain_user,
            'email_access' => $entity->email_access,
            'internet_access' => $entity->internet_access
        ];
    }

    /**
     * @param CommunicationContract $entity
     * @return Item
     */
    public function includeEmployee(CommunicationContract $entity): Item
    {
        return $this->item($entity->employee, app(EmployeeTransformer::class));
    }

    /**
     * @param CommunicationContract $entity
     * @return Collection
     */
    public function includeMobileModel(CommunicationContract $entity): Collection
    {
        return $this->collection($entity->mobileModel, app(MobileModelTransformer::class));
    }

    /**
     * @param CommunicationContract $entity
     */
    public function includeSim(CommunicationContract $entity)
    {
        if ($entity->sim) {
            return $this->item($entity->sim, app(SimTransformer::class));
         } else {
            return null;
         }
    }

}
