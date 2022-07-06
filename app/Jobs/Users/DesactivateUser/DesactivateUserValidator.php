<?php

namespace App\Jobs\Users\DesactivateUser;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DesactivateUserValidator extends ValidatorJob
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
            "id" => "required|exists:users,id",
            "url" => "required"
        ];
    }
}
