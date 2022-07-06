<?php

namespace App\Jobs\Contracts\AddContract;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddContractValidator extends ValidatorJob
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
            'planting_area' => 'required',
            'thousands_plants' => 'required',
            'production' => 'required',
            'performance' => 'required',
            'export_porcentage' => 'required',
            /*'purchase_budget' => 'required',*/
            'production_unit_id' => 'required',
            'farmer_id' => 'required',
            /*'property_type' => 'required',*/
            'planting_type' => 'required'
        ];
    }
}
