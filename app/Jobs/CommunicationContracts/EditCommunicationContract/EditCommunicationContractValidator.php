<?php

namespace App\Jobs\CommunicationContracts\EditCommunicationContract;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditCommunicationContractValidator extends ValidatorJob
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
            "id" => "required|exists:communication_contracts,id"
        ];
    }
    
}
