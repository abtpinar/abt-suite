<?php

namespace App\Jobs\Contracts\GenerateContractsValancePDF;

use App\Jobs\Job;
use App\Jobs\Contracts\GenerateContractsValancePDF\Resolvers\ContractsValanceGeneratePDF;


class GeneratePDF extends Job
{
    #region Constructor and Properties

    /**
     * @var Invoice invoice
     */
    public $invoice;




    /**
     * GeneratePDF constructor.
     * @param array $data
     */
    public function __construct()
    {

    }

    #endregion

    /**
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        return $this->dispatch(
            app(
                ContractsValanceGeneratePDF::class

            )
        );
    }
}
