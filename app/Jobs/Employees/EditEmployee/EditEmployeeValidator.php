<?php

namespace App\Jobs\Employees\EditEmployee;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditEmployeeValidator extends ValidatorJob
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
            "id" => "required|exists:employees,id",
            'dni' => 'required',
            'first_name' => 'required',
            'middle_name' => 'required',
            'last_name' => 'required',
            'department' => 'required',
            'occupation' => 'required'
        ];
    }
}
