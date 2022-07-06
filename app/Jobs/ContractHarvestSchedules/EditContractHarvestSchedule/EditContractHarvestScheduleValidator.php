<?php

namespace App\Jobs\ContractHarvestSchedules\EditContractHarvestSchedule;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditContractHarvestScheduleValidator extends ValidatorJob
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
            "id" => "required|exists:contract_harvest_schedules,id"
        ];
    }
    
}
