<?php

namespace App\Jobs\CommunicationFiles\EditCommunicationFile;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditCommunicationFileValidator extends ValidatorJob
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
            "id" => "required|exists:communication_files,id"
        ];
    }
    
}
