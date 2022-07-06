<?php

namespace App\Jobs\Mobiles\EditMobile;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditMobileValidator extends ValidatorJob
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
            "id" => "required|exists:mobiles,id",
            'imei' => 'required',
            'mac' => 'required'
        ];
    }
}
