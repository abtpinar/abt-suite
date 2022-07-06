<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Allotment extends AbstractEntity
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'allotments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'area',
        'number',
        'division',
        'usage_type_code',
        'farm_id'
    ];

    /**
     *
     * @return BelongsTo
     */
    public function getFarm()
    {
        return $this->belongsTo(Farm::class, 'farm_id', 'id');
    }

    /**
     *
     * @return array
     */
    public function getUsageType()
    {
        return collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.possesion_types'))->where('code', $this->getAttribute('usage_type_code'))->first();
    }
}
