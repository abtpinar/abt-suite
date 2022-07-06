<?php

namespace App\Data\Entities;

use Illuminate\Database\Eloquent\Relations\HasOne;

class ContractProduct extends AbstractEntity
{

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'contract_products';

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
        'amount',
        'price',
        'measurement_unit',
        'basic',
        'contract_id',
        'product_id',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function contract()
    {
        return $this->hasOne(Contract::class, "id", "contract_id");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function product()
    {
        return $this->hasOne(Product::class, "id", "product_id");
    }

}
