<?php

namespace App\Support\Readers;

use App\Helpers\InvoicesHelper;
use App\Data\Entities\DistributorsDownload;
use App\Data\Repositories\Contracts\DistributorsLogsRepository;
use App\Data\Repositories\Contracts\DistributorImportsRepository;

class P5DReader implements IReader
{

    public static function import(
        DistributorsDownload $distributorsDownload,
        DistributorImportsRepository $distributorImportsRepository,
        DistributorsLogsRepository $distributorsLogsRepository
    ): bool {
        $handle = fopen($distributorsDownload->path, 'r');

        if ($handle) {
            while (($line = fgets($handle)) !== false) {
                $elements = explode(';', $line);
                $isTimeChangeHourAutumn = false;

                if (count($elements) > 1) {
                    $cups = !empty($elements[0]) ? substr($elements[0], 0, 20) : null;
                    $dateTime = !empty($elements[1]) ? new \DateTime($elements[1]) : null;
                    $origin = 'p5d';
                    $duplicated = false;

                    $readingExist = $distributorImportsRepository->getByFields(
                        [
                            'cups' => $cups,
                            'date' => $dateTime->format('Y-m-d H:i:s'),
                            'origin' => $origin
                        ]
                    );

                    if (InvoicesHelper::isTimeChangeHourAutumn($dateTime)) {
                        $isTimeChangeHourAutumn = true;

                        if ($readingExist->count() == 1) {
                            $duplicated = true;
                        }
                    }

                    if (
                        $readingExist->count() == 0
                        || ($readingExist->count() < 2 && $isTimeChangeHourAutumn)
                    ) {
                        $period = $elements[2] !== null && is_numeric($elements[2]) ? (int)$elements[2] : null;
                        $incoming_magnitude = !empty($elements[3]) && is_numeric($elements[3]) ? (float)$elements[3] : 0;
                        $outgoing_magnitude = !empty($elements[4]) && is_numeric($elements[4]) ? (float)$elements[4] : null;

                        if (null !== $cups && null !== $dateTime && null !== $period) {
                            $distributorImportsRepository->add(
                                [
                                    'cups' => $cups,
                                    'date' => $dateTime,
                                    'origin' => $origin,
                                    'duplicated' => $duplicated,
                                    'season' => $period,
                                    'incoming_magnitude' => number_format($incoming_magnitude / 1000, 3, '.', ''),
                                    'outgoing_magnitude' => number_format($outgoing_magnitude / 1000, 3, '.', ''),
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'download_id' => $distributorsDownload->id
                                ],
                                false
                            );
                        } else {
                            $distributorsLogsRepository->addErrorLog(
                                [
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'message' => 'Formato incorrecto de P5D en la lectura: ' . $line
                                ]
                            );
                        }
                    }
                }
            }

            fclose($handle);

            return true;
        } else {
            $distributorsLogsRepository->addErrorLog(
                [
                    'distributor_id' => $distributorsDownload->distributor_id,
                    'message' => 'Ha ocurrido un error en la lectura del fichero ' . $distributorsDownload->path
                ]
            );

            return false;
        }
    }
}
