<?php

namespace App\Data\Entities;

use App\Data\Entities\Traits\ImageFunctions;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends AbstractEntity implements \Illuminate\Contracts\Auth\Authenticatable, JWTSubject
{
    use Authenticatable;
    use Notifiable;
    use SoftDeletes;
    use ImageFunctions;

    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'username',
        'password',
        'first_name',
        'last_name',
        'email',
        'phone',
        'picture',
        'active',
        'password_change_key',
        'password_change_date'
    ];

    /**
     * The model's default attributes.
     * @var array
     */
    protected $attributes = [
        'active' => 1
    ];

    /**
     * The attributes that should be mutated to dates.
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * The database table used by the model.
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes excluded from the model's JSON form.
     * @var array
     */
    protected $hidden = ['password', 'remember_token'];

    /**
     * Path to upload avatar.
     * @var string
     */
    protected $path = 'uploads/avatars/';

    /**
     * @return array
     */
    public static function getFieldsWithNiceNames()
    {
        return [
            'first_name' => 'Nombre',
            'last_name' => 'Apellidos',
            'email' => 'Email',
            'password' => 'Contraseña',
            'phone' => 'Teléfono',
            'picture' => 'Imagen',
            'active' => 'Activo'
        ];
    }

    /**
     * @return string
     */
    public function getFullNameAttribute()
    {
        return ucwords($this->first_name . ' ' . $this->last_name);
    }

    /**
     * @param $value
     */
    public function setPasswordAttribute($value)
    {
        if (!empty($value)) {
            $this->attributes['password'] = \Hash::make($value);
        }
    }

    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'roles_users', 'user_id');
    }
}
