<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class CommunicationContract extends AbstractEntity
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'communication_contracts';

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
        'version',
        'origin',        
        'state',
        'activation_date',
        'expiration_date',
        'employee_id',
        'department',
        'occupation',
        'sim_id',
        'call_time',
        'sms_credit',
        'data_plan',
        'mobile_id',
        'mobile_accesories',
        'domain_access',
        'domain_user',
        'email_access',
        'internet_access'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function employee()
    {
        return $this->hasOne(Employee::class, "id", "employee_id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function mobileModel()
    {
        return $this->hasManyThrough(
            MobileModel::class,
            Mobile::class,
            'id', // Foreign key on Mobiles table...
            'id', // Foreign key on MobileModels table...
            'mobile_id', // Local key on Contracts table...
            'mobile_model_id' // Local key on Mobiles table...
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function sim()
    {
        return $this->hasOne(Sim::class, "id", "sim_id");
    }

    /**
     * @return float
     */
    public function getSmsCreditAttribute()
    {
        return isset($this->attributes['sms_credit']) ? round($this->attributes['sms_credit'], 2) : null;
    }

}
