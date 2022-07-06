<?php

namespace App\Jobs\Sims\EditSim;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditSimValidator extends ValidatorJob
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
            "id" => "required|exists:sims,id",
            'number' => 'required',
            'pin' => 'required',
            'puk' => 'required'
        ];
    }
}
