<?php

namespace App\Data\Entities;

use App\Data\Entities\Traits\ImageFunctions;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductionUnit extends AbstractEntity
{
    use ImageFunctions;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'production_units';

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
        'address',
        'president_name',
        'president_agreement_number',
        'bank',
        'bank_account',
        'active'
    ];

}
