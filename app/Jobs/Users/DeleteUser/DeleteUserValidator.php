<?php namespace App\Jobs\Users\EditUser;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DeleteUserValidator extends ValidatorJob
{
    /**
     * Return the rules to use when validating
     *
     * @param Job $job
     * @return array
     */
    public function getRules(Job $job)
    {
        $rules = [
            "id" => "required|exists:users,id"
        ];

        return $rules;
    }
}
