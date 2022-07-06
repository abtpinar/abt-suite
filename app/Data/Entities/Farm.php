<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Farm extends AbstractEntity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'farms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'record_number',
        'activation_date',
        'expiration_date',
        'total_area',
        'coordinates',
        'version',
        'origin',
        'ground_feature_code',
        'possesion_type_code',
        'farmer_id'
    ];

    /**
     *
     * @return BelongsTo
     */
    public function getFarmer()
    {
        return $this->belongsTo(Farmer::class, 'farmer_id', 'id');
    }

    /**
     *
     * @return HasMany
     */
    public function getAllotments()
    {
        return $this->hasMany(Allotment::class, 'farm_id', 'id');
    }

    /**
     *
     * @return HasMany
     */
    public function getCoOwners()
    {
        return $this->hasMany(CoOwner::class, 'farm_id', 'id');
    }
 
}
