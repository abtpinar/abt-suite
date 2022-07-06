<?php

namespace App\Jobs\ContractIrrigationSchedules\EditContractIrrigationSchedule;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditContractIrrigationScheduleValidator extends ValidatorJob
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
            "id" => "required|exists:contract_irrigation_schedules,id"
        ];
    }
    
}
