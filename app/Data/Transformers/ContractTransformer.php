<?php

namespace App\Data\Transformers;

use App\Data\Entities\Contract;
use League\Fractal\Resource\Collection;
use League\Fractal\Resource\Item;

class ContractTransformer extends AbstractTransformer
{

    /**
     * Resources that can be included if requested.
     *
     * @var array
     */
    protected $availableIncludes = [
        'farmer',
        'contract_planting_schedules',
        'contract_irrigation_schedules',
        'contract_harvest_schedules',
        'contract_tobacco_class_schedules',
        'contract_products',
        'production_unit'
    ];

    protected $dates = [];


    /**
     * Turn this item object into a generic array
     *
     * @param Contract $entity
     *
     * @return array
     */
    public function transform(Contract $entity)
    {
        return [
            'id' => $entity->id,
            'version' => $entity->version,
            'origin' => $entity->origin,
            'state' => $entity->state,
            'date' => $entity->date,
            'expiration_date' => $entity->expiration_date,
            'planting_area' => $entity->planting_area,
            'thousands_plants' => $entity->thousands_plants,
            'production' => $entity->production,
            'performance' => $entity->performance,
            'export_porcentage' => $entity->export_porcentage,
            'purchase_budget' => round($this->purchaseBudget($entity), 2),
            'production_unit_id' => $entity->production_unit_id,
            'farmer_id' => $entity->farmer_id,
            'property_type' => $entity->property_type,
            'planting_type' => $entity->planting_type,
            'tobacco_type' => $entity->tobacco_type,
            'tobacco_type_name' => collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.tobacco_type'))->where('code', $entity->tobacco_type)->first(),
        ];
    }

    /**
     * @param Contract $entity
     * @return Item
     */
    public function includeFarmer(Contract $entity): Item
    {
        return $this->item($entity->farmer, app(FarmerTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Collection
     */
    public function includeContractPlantingSchedules(Contract $entity): Collection
    {
        return $this->collection($entity->plantingSchedules, app(ContractPlantingScheduleTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Collection
     */
    public function includeContractIrrigationSchedules(Contract $entity): Collection
    {
        return $this->collection($entity->irrigationSchedules, app(ContractIrrigationScheduleTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Collection
     */
    public function includeContractHarvestSchedules(Contract $entity): Collection
    {
        return $this->collection($entity->harvestSchedules, app(ContractHarvestScheduleTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Collection
     */
    public function includeContractTobaccoClassSchedules(Contract $entity): Collection
    {
        return $this->collection($entity->tobaccoClassSchedules, app(ContractTobaccoClassScheduleTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Collection
     */
    public function includeContractProducts(Contract $entity): Collection
    {
        return $this->collection($entity->products, app(ContractProductTransformer::class));
    }

    /**
     * @param Contract $entity
     * @return Item
     */
    public function includeProductionUnit(Contract $entity): Item
    {
        return $this->item($entity->productionUnit, app(ProductionUnitTransformer::class));
    }

    /**
     * Auxialiary method for calculate purchase budget
     *
     * @param Contract $entity
     * @return int
     */

    public function purchaseBudget(Contract $entity)
    {
        $purchase_budget= 0;

        foreach ($entity->products as $product)
            $purchase_budget += $product->amount * $product->price;

        return $purchase_budget;
    }

}
