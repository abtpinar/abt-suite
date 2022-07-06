<?php

namespace App\Jobs\ContractPlantingSchedules\EditContractPlantingSchedule;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditContractPlantingScheduleValidator extends ValidatorJob
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
            "id" => "required|exists:contract_planting_schedules,id"
        ];
    }
    
}
