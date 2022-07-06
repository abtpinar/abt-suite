<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Contract extends AbstractEntity
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'contracts';

    protected $dates = [];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'version',
        'origin',
        'state',
        'date',
        'expiration_date',
        'planting_area',
        'thousands_plants',
        'production',
        'performance',
        'export_porcentage',
        'purchase_budget',
        'production_unit_id',
        'farmer_id',
        'property_type',
        'planting_type',
        'tobacco_type'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function farmer()
    {
        return $this->hasOne(Farmer::class, "id", "farmer_id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function productionUnit()
    {
        return $this->hasOne(ProductionUnit::class, "id", "production_unit_id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function plantingSchedules()
    {
        return $this->hasMany(ContractPlantingSchedule::class, 'contract_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function irrigationSchedules()
    {
        return $this->hasMany(ContractIrrigationSchedule::class, 'contract_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function harvestSchedules()
    {
        return $this->hasMany(ContractHarvestSchedule::class, 'contract_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function tobaccoClassSchedules()
    {
        return $this->hasMany(ContractTobaccoClassSchedule::class, 'contract_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(ContractProduct::class, 'contract_id');
    }

    /**
     * @return float
     */
    public function getProductionAttribute()
    {
        return isset($this->attributes['production']) ? round($this->attributes['production'], 2) : null;
    }

    /**
     * @return float
     */
    public function getPerformanceAttribute()
    {
        return isset($this->attributes['performance']) ? round($this->attributes['performance'], 2) : null;
    }

}
