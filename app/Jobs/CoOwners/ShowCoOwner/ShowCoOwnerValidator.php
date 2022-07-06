<?php

namespace App\Jobs\CoOwners\ShowCoOwner;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class ShowCoOwnerValidator extends ValidatorJob
{
    /**
     * @param Job $job
     * @return array|void
     */
    function getRules(Job $job)
    {
       return ['id' => 'required|exists:co_owners,id'];
    } 
}