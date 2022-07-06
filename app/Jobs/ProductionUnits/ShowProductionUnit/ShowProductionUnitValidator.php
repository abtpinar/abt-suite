<?php

namespace App\Jobs\ProductionUnits\ShowProductionUnit;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class ShowProductionUnitValidator extends ValidatorJob
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
            "id" => "required|exists:production_units,id"
        ];
    }
}
