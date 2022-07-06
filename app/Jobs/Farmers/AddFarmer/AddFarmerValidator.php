<?php

namespace App\Jobs\Farmers\AddFarmer;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddFarmerValidator extends ValidatorJob
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
            /*'code' => 'required',*/
            'first_name' => 'required',
            'middle_name' => 'required',
            'last_name' => 'required',
            'production_unit_id' => 'required',
            'ci' => 'required |unique:farmers|max:11|min:11'
        ];
    }
}
