<?php

namespace App\Jobs\Sims\AddSim;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;
use Illuminate\Validation\Rule;

class AddSimValidator extends ValidatorJob
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
            'number' => 'required',
            'pin' => 'required',
            'puk' => 'required'
        ];
    }
}
