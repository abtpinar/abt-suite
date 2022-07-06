<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasOne;

class ContractPlantingSchedule extends AbstractEntity
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'contract_planting_schedules';

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
        'tobacco_family',
        'month',
        'amount_p1',
        'amount_p2',
        'amount_p3',
        'contract_id',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function contract()
    {
        return $this->hasOne(Contract::class, "id", "contract_id");
    }

}
