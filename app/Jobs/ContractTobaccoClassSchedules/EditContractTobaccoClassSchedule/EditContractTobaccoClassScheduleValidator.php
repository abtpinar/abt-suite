<?php

namespace App\Jobs\ContractTobaccoClassSchedules\EditContractTobaccoClassSchedule;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditContractTobaccoClassScheduleValidator extends ValidatorJob
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
            "id" => "required|exists:contract_tobacco_class_schedules,id"
        ];
    }
    
}
