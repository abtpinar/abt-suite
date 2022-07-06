<?php

namespace App\Jobs\Farms\ShowFarm;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class ShowFarmValidator extends ValidatorJob
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
            "id" => "required|exists:farms,id"
        ];
    }
    
}