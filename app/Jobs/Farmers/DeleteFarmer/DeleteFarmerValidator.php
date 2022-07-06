<?php

namespace App\Jobs\Farmers\DeleteFarmer;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DeleteFarmerValidator extends ValidatorJob
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
            "id" => "required|exists:farmers,id"
        ];
    }
}
