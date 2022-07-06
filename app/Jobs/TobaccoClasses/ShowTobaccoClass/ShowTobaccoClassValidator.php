<?php

namespace App\Jobs\TobaccoClasses\ShowTobaccoClass;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class ShowTobaccoClassValidator extends ValidatorJob
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
            "id" => "required|exists:tobacco_classes,id"
        ];
    }
}
