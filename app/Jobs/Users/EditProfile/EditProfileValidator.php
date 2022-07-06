<?php

namespace App\Jobs\Users\EditProfile;

use App\Data\Entities\User;
use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Support\Facades\Auth;

class EditProfileValidator extends ValidatorJob
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
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required|unique:users,email,' . Auth::user()->id
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
