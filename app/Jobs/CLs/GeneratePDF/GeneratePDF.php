<?php

namespace App\Jobs\CLs\GeneratePDF;

use App\Jobs\Job;

class GeneratePDF extends Job
{
    #region Constructor and Properties

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
                'App\Jobs\CLs\GeneratePDF\Resolvers\\' . ucwords(config('system.app_brand')) . 'GeneratePDF',
                ['data' => $this->data]
            )
        );
    }
}
