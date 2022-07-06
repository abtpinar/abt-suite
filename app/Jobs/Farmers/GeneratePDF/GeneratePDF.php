<?php

namespace App\Jobs\Farmers\GeneratePDF;

use App\Jobs\Job;

class GeneratePDF extends Job
{
    #region Constructor and Properties

    /**
     * @var Invoice invoice
     */
    public $invoice;
    /**
     * @var array invoice
     */
    public $data;


    /**
     * GeneratePDF constructor.
     * @param array $data
     */
    public function __construct(array $data)
    {
        $this->data = $data;
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
                'App\Jobs\Farmers\GeneratePDF\Resolvers\\' . ucwords(config('system.app_brand', 'tabacosj')) . 'GeneratePDF',
                ['data' => $this->data]
            )
        );
    }
}
