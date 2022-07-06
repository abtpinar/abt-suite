<?php

namespace App\Jobs\Farms\DeleteFarm;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DeleteFarmValidator extends ValidatorJob
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