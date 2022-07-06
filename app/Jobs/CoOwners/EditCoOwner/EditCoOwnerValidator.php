<?php

namespace App\Jobs\CoOwners\EditCoOwner;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditCoOwnerValidator extends ValidatorJob
{

    /**
     * Implement getRules() method.
     * @param Job $job
     * @return array|void
     */
    function getRules(Job $job)
    {
        return [
            'id' => 'required|exists:co_owners,id',
            'percent_owner' => 'required',
            'farm_id' => 'required|exists:farms,id',
            'farmer_id' => 'required|exists:farmers,id',
        ];
    }
}