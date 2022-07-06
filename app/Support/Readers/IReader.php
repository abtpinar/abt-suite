<?php

namespace App\Support\Readers;


use App\Data\Entities\DistributorsDownload;
use App\Data\Repositories\Contracts\DistributorImportsRepository;
use App\Data\Repositories\Contracts\DistributorsLogsRepository;

interface IReader
{
    public static function import(
        DistributorsDownload $distributorsDownload,
        DistributorImportsRepository $distributorImportsRepository,
        DistributorsLogsRepository $distributorsLogsRepository
    ): bool;
}