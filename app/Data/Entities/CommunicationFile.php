<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class CommunicationFile extends AbstractEntity
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'communication_files';

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
        'employee_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function employee()
    {
        return $this->hasOne(Employee::class, "id", "employee_id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function components()
    {
        return $this->hasMany(CommunicationFileComponent::class, 'communication_file_id');
    }
}
