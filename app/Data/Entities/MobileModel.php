<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class MobileModel extends AbstractEntity
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'mobile_models';

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
        'name',
        'mobile_brand_id',
    ];

    /**
     * @return string
     */
    public function brandName()
    {
        return $this->hasOne(MobileBrand::class, "id", "mobile_brand_id")->first()->name;
    }

}
