<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Mobile extends AbstractEntity
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'mobiles';

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
        'mac',
        'imei',
        'imei2',
        'mobile_model_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function mobileModel()
    {
        return $this->hasOne(MobileModel::class, "id", "mobile_model_id");
    }

}
