<?php

namespace App\Jobs\CLs\DownloadPdf;

use App\Data\Repositories\Contracts\CLsRepository;
use App\Jobs\CLs\GeneratePDF\GeneratePDF;
use App\Jobs\Job;
use App\Support\Constants;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class DownloadPdf extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;

    /**
     * @var CLsRepository
     */
    private $repository;
    
    /**
     * @var string
     */
    private $pdfsDirectory;

    /**
     * Create a new job instance.
     * @param array $data
     * @param CLsRepository $repository
     */
    public function __construct(array $data, CLsRepository $repository)
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->pdfsDirectory = public_path('downloads/pdfs/');
    }

    #endregion

    /**
     * Execute the job.
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        try {
            $pdfString = $this->dispatch(app(GeneratePDF::class, ['data' => $this->data]));
        } catch (\Exception $e) {
            Log::error($e);

            return $this->apiFormattedResponse(
                Constants::RESPONSE_STATUS_ERROR,
                Constants::RESPONSE_HTTP_CODE_ERROR,
                [],
                null,
                Constants::RESPONSE_HTTP_CODE_ERROR
            );
        }

        $uuid = uniqid();
        $fileName = $uuid . '.pdf';
        $outputDirectory = $this->pdfsDirectory . $fileName;
        file_put_contents($outputDirectory, $pdfString);
        $headers = ['Content-Type' => 'application/pdf', 'Access-Control-Allow-Origin' => '*'];

        return Response::download($outputDirectory, $fileName, $headers)->deleteFileAfterSend(true);
    }
}
