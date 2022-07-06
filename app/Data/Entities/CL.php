<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class CL extends AbstractEntity
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'cl';

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
        'farmer_id',
        'farmer_code',
        'farmer_name',
        'credit_card',
        'unit_id',
        'unit_name',
        'kilograms',
        'tobacco_type',
        'amount',
        'status',
        'expense',
        'refunds'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function payments()
    {
        return $this->hasMany(CLPaymentItem::class, 'cl_id');
    }

}
