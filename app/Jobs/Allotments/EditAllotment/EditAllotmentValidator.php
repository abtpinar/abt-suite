<?php

namespace App\Jobs\Allotments\EditAllotment;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditAllotmentValidator extends ValidatorJob
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
            "id" => "required|exists:allotments,id",
            'area' => 'required',
            'number' => 'required',
            'division' => 'required',
            'usage_type' => 'required',
            'farm_id' => 'required | exists:farms,id',
        ];
    }
}