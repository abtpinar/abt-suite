<?php

namespace App\Jobs\CoOwners\AddCowner;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class AddCoOwnerValidator extends ValidatorJob
{

    /**
     * Return the rules to use when validating
     *
     * @param Job $job
     * @return array
     */
    function getRules(Job $job)
    {
        return [
            'percent_owner' => 'required',
            'farm_id' => 'required|exists:farms,id',
            'farmer_id' => 'required|exists:farmers,id',
        ];
    }
}