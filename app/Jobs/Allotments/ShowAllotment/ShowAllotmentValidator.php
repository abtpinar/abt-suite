<?php

namespace App\Jobs\Allotments\ShowAllotment;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class ShowAllotmentValidator extends ValidatorJob
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
            'id' => 'required|exists:allotments,id'
        ];
    }
}