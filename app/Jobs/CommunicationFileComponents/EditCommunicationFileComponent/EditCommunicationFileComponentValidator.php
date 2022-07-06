<?php

namespace App\Jobs\CommunicationFileComponents\EditCommunicationFileComponent;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditCommunicationFileComponentValidator extends ValidatorJob
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
            "id" => "required|exists:communication_file_components,id"
        ];
    }
    
}
