<?php

namespace App\Support\Readers;

use App\Data\Entities\DistributorsDownload;
use App\Data\Repositories\Contracts\DistributorImportsRepository;
use App\Data\Repositories\Contracts\DistributorsLogsRepository;

class BaseReader
{
    /**
     * @var DistributorImportsRepository
     */
    private $distributorImportsRepository;

    /**
     * @var DistributorsLogsRepository
     */
    private $distributorsLogsRepository;

    public function __construct(
        DistributorImportsRepository $distributorImportsRepository,
        DistributorsLogsRepository $distributorsLogsRepository
    ) {
        $this->distributorImportsRepository = $distributorImportsRepository;
        $this->distributorsLogsRepository = $distributorsLogsRepository;
    }

    public function importFile(DistributorsDownload $distributorsDownload): bool
    {
        $segments = explode('_', $distributorsDownload->filename);

        if (!in_array($segments[0], ['P1', 'P1D', 'P5D', 'F1', 'F5D'])) {
            $this->distributorsLogsRepository->addErrorLog(
                [
                    'distributor_id' => $distributorsDownload->distributor_id,
                    'message' => 'El fichero ' . $distributorsDownload->path . ' no es soportado.'
                ]
            );

            return false;
        }

        if (mime_content_type($distributorsDownload->path) == 'application/x-bzip2') {
            file_put_contents(
                $distributorsDownload->path,
                bzdecompress(file_get_contents($distributorsDownload->path))
            );
        } elseif (mime_content_type($distributorsDownload->path) == 'application/x-gzip') {
            file_put_contents($distributorsDownload->path, gzdecode(file_get_contents($distributorsDownload->path)));
        }

        return call_user_func_array(
            ['\App\Support\Readers\\' . $segments[0] . 'Reader', 'import'],
            [
                $distributorsDownload,
                $this->distributorImportsRepository,
                $this->distributorsLogsRepository
            ]
        );
    }
}
