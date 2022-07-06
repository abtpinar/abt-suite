<?php

namespace App\Jobs\CoOwners\DeleteCoOwner;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class DeleteCoOwnerValidator extends ValidatorJob
{
    /**
     * 
     * Implement getRules() method.
     * @param Job $job
     * @return array|void
     */
    function getRules(Job $job)
    {
        return ['id' => 'required | exists:co_owners,id'];
    }
}