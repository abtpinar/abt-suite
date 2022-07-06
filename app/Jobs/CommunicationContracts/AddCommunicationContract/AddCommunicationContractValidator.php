<?php

namespace App\Jobs\CommunicationContracts\AddCommunicationContract;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddCommunicationContractValidator extends ValidatorJob
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
            'origin' => 'required'
        ];
    }
}
