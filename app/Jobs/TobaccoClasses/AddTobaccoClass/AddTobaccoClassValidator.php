<?php

namespace App\Jobs\TobaccoClasses\AddTobaccoClass;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddTobaccoClassValidator extends ValidatorJob
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
            'name' => 'required',
            'price' => 'required'
        ];
    }
}
