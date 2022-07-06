<?php

namespace App\Jobs\ProductionUnits\DeleteProductionUnit;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DeleteProductionUnitValidator extends ValidatorJob
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
