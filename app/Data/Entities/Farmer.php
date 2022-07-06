<?php

namespace App\Data\Entities;

use App\Data\Entities\Traits\ImageFunctions;
use App\Data\Entities\Farm;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Farmer extends AbstractEntity
{
    use ImageFunctions;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'farmers';

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
        'code',
        'first_name',
        'middle_name',
        'last_name',
        'telephone_number',
        'cup_card',
        'mlc_card',
        'coordinates',
        'address',
        'ci',
        'picture',
        'production_unit_id',
        'active'
    ];

    /**
     * Path to upload picture.
     * @var string
     */
    protected $path = 'uploads/pictures/';

    /**
     * @return HasMany
     */
    public function contracts()
    {
        return $this->hasMany(Contract::class, 'farmer_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function productionUnit()
    {
        return $this->hasOne(ProductionUnit::class, "id", "production_unit_id");
    }

    /**
     *
     * @return HasMany
     */
    public function getFarms()
    {
        return $this->hasMany(Farm::class, 'farmer_id', 'id');
    }
}
