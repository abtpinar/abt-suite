<?php

namespace App\Jobs\Allotments\AddAllotment;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class AddAllotmentValidator extends ValidatorJob
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
            'area' => 'required',
            'number' => 'required',
            'division' => 'required',
            'usage_type' => 'required',
            'farm_id' => 'required|exists:farms,id'
        ];
    }
}