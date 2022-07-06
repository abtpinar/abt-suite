<?php

namespace App\Jobs\Farmers\EditFarmer;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditFarmerValidator extends ValidatorJob
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
            "id" => "required|exists:farmers,id",
            /*'code' => 'required',*/
            'first_name' => 'required',
            'middle_name' => 'required',
            'last_name' => 'required',
            'production_unit_id' => 'required',
            'ci' => 'required'
        ];
    }
}
