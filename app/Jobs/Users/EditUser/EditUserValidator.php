<?php namespace App\Jobs\Users\EditUser;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditUserValidator extends ValidatorJob
{
    /**
     * Return the rules to use when validating
     *
     * @param Job $job
     * @return array
     * @throws \Exception
     */
    public function getRules(Job $job)
    {
        $rules = [
            "id" => "required|exists:users,id",
            "first_name" => "required|max:255",
            "last_name" => "required|max:255",
            "email" => "required|email|max:255|unique:users,email," . $this->getData($job)['id']
        ];

        return $rules;
    }
}
