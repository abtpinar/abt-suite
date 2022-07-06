<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends AbstractEntity
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'products';

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
        'name',
        'category',
        'price',
        'price_history',
        'measurement_unit',
        'active',
        'expense_concept',
        'consumption_standard_tp',
        'consumption_standard_v1',
        'consumption_standard_v2',
        'consumption_standard_sp',
        'consumption_standard_by',
        'consumption_standard_vg',
    ];

}
