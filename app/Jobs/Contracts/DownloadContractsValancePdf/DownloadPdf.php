<?php

namespace App\Jobs\Contracts\DownloadContractsValancePdf;

use App\Data\Repositories\Contracts\ContractsRepository;
use App\Jobs\Contracts\GenerateContractsValancePDF\GeneratePDF;
use App\Jobs\Job;
use App\Support\Constants;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;

class DownloadPdf extends Job
{
    #region Constructor and Properties

    /**
     * @var ContractsRepository
     */
    private $repository;
    /**
     * @var string
     */
    private $pdfsDirectory;

    /**
     * Create a new job instance.
     * @param ContractsRepository $repository
     */
    public function __construct(ContractsRepository $repository)
    {
        $this->repository = $repository;
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
        /*try {*/
            $pdfString = $this->dispatch(app(GeneratePDF::class));
       /* } catch (\Exception $e) {
            Log::error($e);

            return $this->apiFormattedResponse(
                Constants::RESPONSE_STATUS_ERROR,
                Constants::RESPONSE_HTTP_CODE_ERROR,
                [],
                null,
                Constants::RESPONSE_HTTP_CODE_ERROR
            );
        }*/

        $uuid = uniqid();
        $fileName = $uuid . '.pdf';
        $outputDirectory = $this->pdfsDirectory . $fileName;
        file_put_contents($outputDirectory, $pdfString);
        $headers = ['Content-Type' => 'application/pdf', 'Access-Control-Allow-Origin' => '*'];

        return Response::download($outputDirectory, $fileName, $headers)->deleteFileAfterSend(true);
    }
}
