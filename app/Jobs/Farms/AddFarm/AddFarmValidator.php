<?php

namespace App\Jobs\Farms\AddFarm;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;


class AddFarmValidator extends ValidatorJob
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
            'record_number' => 'required',
            'activation_date' => 'required',
            'expiration_date' => 'required',
            /*'coordinates' => 'required',
            'version' => 'required',
            'origin' => 'required',*/
            'ground_feature_code' => 'required',
            'possesion_type_code' => 'required',
            'farmer_id' => 'required|exists:farmers,id',
        ];
    }
}