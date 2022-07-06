<?php

namespace App\Data\Entities;



class TobaccoPrice extends AbstractEntity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'tobacco_price';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'percent',
        'price',
        'tobacco_type_code',
    ];
}
