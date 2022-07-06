<?php

namespace App\Data\Transformers;

use App\Data\Entities\Farmer;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class FarmerTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'contracts',
        'production_unit',
        'farms'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param Farmer $entity
     *
     * @return array
     */
    public function transform(Farmer $entity)
    {
        return [
            'id' => $entity->id,
            'code' => $entity->code,
            'first_name' => $entity->first_name,
            'middle_name' => $entity->middle_name,
            'last_name' => $entity->last_name,
            'telephone_number' => $entity->telephone_number,
            'cup_card' => $entity->cup_card,
            'mlc_card' => $entity->mlc_card,
            'picture' => $entity->picture,
            'production_unit_id' => $entity->production_unit_id,
            'active' => $entity->active,
            'ci' => $entity->ci,
            'unit' => $entity->productionUnit
        ];
    }

    /**
     * @param Farmer $entity
     * @return Collection
     */
    public function includeContracts(Farmer $entity): Collection
    {
        return $this->collection($entity->contracts, app(ContractTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Item
     */
    public function includeProductionUnit(Farmer $entity): Item
    {
        return $this->item($entity->productionUnit, app(ProductionUnitTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Collection
     */
    public function includeFarms(Farmer $entity): Collection
    {
        return $this->collection($entity->getFarms, app(FarmTransformer::class));
    }

}
