<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasMany;

class CommunicationFileComponent extends AbstractEntity
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'communication_file_components';

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
        'maker',
        'model',        
        'properties',
        'serial',
        'inventory',
        'is_peripheral',
        'is_laptop',
        'communication_file_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function communicationFile()
    {
        return $this->hasOne(CommunicationFile::class, "id", "communication_file_id");
    }

}
