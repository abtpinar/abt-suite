<?php

namespace App\Jobs\ProductionUnits\AddProductionUnit;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddProductionUnitValidator extends ValidatorJob
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
            'code' => 'required|unique:production_units',
            'name' => 'required'
        ];
    }
}
