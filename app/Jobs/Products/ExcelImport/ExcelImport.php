<?php

namespace App\Jobs\Products\ExcelImport;

use App\Http\Controllers\Products\ProductImport;
use App\Jobs\Job;
use App\Support\Constants;
use Maatwebsite\Excel\Facades\Excel;

class ExcelImport extends Job
{
    # use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var array
     */
    public $data;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            Excel::import(new ProductImport(), $this->data['file']);
            return $this->apiFormattedResponse(
                Constants::RESPONSE_STATUS_SUCCESS,
                Constants::RESPONSE_HTTP_CODE_SUCCESS,
                ['good Job, keep working like this!'],
                null,
                Constants::RESPONSE_HTTP_CODE_SUCCESS
            );
        } catch (\Exception $e) {
            return $this->apiFormattedResponse(
                Constants::RESPONSE_STATUS_ERROR,
                Constants::RESPONSE_HTTP_CODE_ERROR,
                ['Something is wrong, try again!'],
                null,
                Constants::RESPONSE_HTTP_CODE_ERROR
            );
        }
    }
}
