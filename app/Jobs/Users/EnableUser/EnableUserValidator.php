<?php

namespace App\Jobs\Users\EnableUser;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EnableUserValidator extends ValidatorJob
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
            "password_change_key" => "required",
            "password" => "required|confirmed",
            "password_confirmation" => "required",
        ];
    }
}
