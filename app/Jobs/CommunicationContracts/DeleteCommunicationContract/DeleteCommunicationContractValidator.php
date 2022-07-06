<?php

namespace App\Jobs\CommunicationContracts\DeleteCommunicationContract;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DeleteCommunicationContractValidator extends ValidatorJob
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
