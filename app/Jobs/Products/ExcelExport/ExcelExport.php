<?php

namespace App\Jobs\Products\ExcelExport;

use App\Http\Controllers\Products\ProductExport;
use App\Jobs\Job;
use App\Support\Constants;
use Maatwebsite\Excel\Facades\Excel;

class ExcelExport extends Job
{
    #use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
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
        set_time_limit(0);
        ini_set("memory_limit", "2000M");
        try {

            return Excel::download(new ProductExport($this->data['headings']), 'Productos.xlsx');

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
