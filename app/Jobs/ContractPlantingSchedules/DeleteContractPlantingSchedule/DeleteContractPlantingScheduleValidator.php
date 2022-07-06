<?php

namespace App\Jobs\ContractPlantingSchedules\DeleteContractPlantingSchedule;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DeleteContractPlantingScheduleValidator extends ValidatorJob
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
