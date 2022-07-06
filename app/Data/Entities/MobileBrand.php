<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class MobileBrand extends AbstractEntity
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'mobile_brands';

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
    ];

}
