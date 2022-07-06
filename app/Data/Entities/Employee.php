<?php

namespace App\Data\Entities;

use App\Data\Entities\Traits\ImageFunctions;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Employee extends AbstractEntity
{
    use ImageFunctions;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'employees';

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
        'dni',
        'first_name',
        'middle_name',
        'last_name',
        'picture',
        'department',
        'occupation',
        'active'
    ];

    /**
     * Path to upload picture.
     * @var string
     */
    protected $path = 'uploads/pictures/';

    /**
     * @return HasMany
     */
    public function communicationContracts()
    {
        return $this->hasMany(CommunicationContract::class, 'employee_id');
    }

}
