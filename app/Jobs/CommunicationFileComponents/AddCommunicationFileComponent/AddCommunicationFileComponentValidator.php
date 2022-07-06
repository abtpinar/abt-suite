<?php

namespace App\Jobs\CommunicationFileComponents\AddCommunicationFileComponent;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddCommunicationFileComponentValidator extends ValidatorJob
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
        ];
    }
}
