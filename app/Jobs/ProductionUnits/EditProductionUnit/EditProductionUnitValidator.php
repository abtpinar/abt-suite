<?php

namespace App\Jobs\ProductionUnits\EditProductionUnit;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditProductionUnitValidator extends ValidatorJob
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
            "id" => "required|exists:production_units,id",
            'code' => 'required|exists:production_units,code'
        ];
    }
}
