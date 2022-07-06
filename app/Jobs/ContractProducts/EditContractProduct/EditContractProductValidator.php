<?php

namespace App\Jobs\ContractProducts\EditContractProduct;

use App\Jobs\Job;
use App\Support\Bus\Decorators\Validator\ValidatorJob;

class EditContractProductValidator extends ValidatorJob
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
            "id" => "required|exists:contract_products,id"
        ];
    }
    
}
