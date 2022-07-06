<?php namespace App\Jobs\Users\AddUser;

use App\Data\Entities\User;
use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class AddUserValidator extends ValidatorJob
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
            "first_name" => "required|max:255",
            "last_name" => "required|max:255",
            "email" => "required|email|max:255|unique:users,email"
        ];
    }

    /**
     * @return array
     */
    function attributes()
    {
        return User::getFieldsWithNiceNames();
    }
}
