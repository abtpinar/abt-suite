<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CoOwner extends AbstractEntity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'co_owners';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'percent_owner',
        'farm_id',
        'farmer_id',
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
     * @return BelongsTo
     */
    public function getFarm()
    {
        return $this->belongsTo(Farm::class, 'farm_id', 'id');
    }
}
