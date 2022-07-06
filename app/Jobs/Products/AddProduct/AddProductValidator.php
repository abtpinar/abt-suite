<?php

namespace App\Jobs\Products\AddProduct;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddProductValidator extends ValidatorJob
{
    /**
     * Return the rules to use when validating
     *
     * @param Job $job
     * @return array
     */
    public function getRules(Job $job)
    {
        return [
            'code' => 'required',
            'name' => 'required',
            'price' => 'required'
        ];
    }
}
