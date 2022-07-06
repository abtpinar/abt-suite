<?php

namespace App\Jobs\Products\EditProduct;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditProductValidator extends ValidatorJob
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
            "id" => "required|exists:products,id",
            'code' => 'required',
            'name' => 'required',
            'price' => 'required'
        ];
    }

}
