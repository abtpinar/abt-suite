<?php

namespace App\Support\Readers;

use Carbon\Carbon;
use App\Helpers\InvoicesHelper;
use App\Data\Entities\DistributorsDownload;
use App\Data\Repositories\Contracts\DistributorsLogsRepository;
use App\Data\Repositories\Contracts\DistributorImportsRepository;

class F5DReader implements IReader
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
                    $dateTime = !empty($elements[1]) ? Carbon::createFromFormat('Y/m/d H:i', $elements[1]) : null;
                    $origin = 'f5d';
                    $duplicated = false;

                    $readingExist = $distributorImportsRepository->getByFields(
                        [
                            'cups' => $cups,
                            'date' => $dateTime->format('Y-m-d H:i:00'),
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
                        $season = $elements[2] !== null && is_numeric($elements[2]) ? (int)$elements[2] : null;
                        $incoming_magnitude = !empty($elements[3]) && is_numeric(
                            $elements[3]
                        ) ? (float)$elements[3] : null;
                        $outgoing_magnitude = !empty($elements[4]) && is_numeric(
                            $elements[4]
                        ) ? (float)$elements[4] : null;
                        $magnitude_quadrant_1 = !empty($elements[5]) && is_numeric(
                            $elements[5]
                        ) ? (float)$elements[5] : null;
                        $magnitude_quadrant_2 = !empty($elements[6]) && is_numeric(
                            $elements[6]
                        ) ? (float)$elements[6] : null;
                        $magnitude_quadrant_3 = !empty($elements[7]) && is_numeric(
                            $elements[7]
                        ) ? (float)$elements[7] : null;
                        $magnitude_quadrant_4 = !empty($elements[8]) && is_numeric(
                            $elements[8]
                        ) ? (float)$elements[8] : null;
                        $method = !empty($elements[9]) && is_numeric($elements[9]) ? (int)$elements[9] : null;
                        $indicator = !empty($elements[10]) && is_numeric($elements[10]) ? (int)$elements[10] : null;
                        $invoice = !empty(trim($elements[11])) ? trim($elements[11]) : null;

                        if (null !== $cups && null !== $dateTime && null !== $season) {
                            $distributorImportsRepository->add(
                                [
                                    'cups' => $cups,
                                    'date' => $dateTime->format('Y-m-d H:i:00'),
                                    'duplicated' => $duplicated,
                                    'origin' => 'f5d',
                                    'season' => $season,
                                    'incoming_magnitude' => number_format($incoming_magnitude / 1000, 3, '.', ''),
                                    'outgoing_magnitude' => number_format($outgoing_magnitude / 1000, 3, '.', ''),
                                    'magnitude_quadrant_1' => number_format($magnitude_quadrant_1 / 1000, 3, '.', ''),
                                    'magnitude_quadrant_2' => number_format($magnitude_quadrant_2 / 1000, 3, '.', ''),
                                    'magnitude_quadrant_3' => number_format($magnitude_quadrant_3 / 1000, 3, '.', ''),
                                    'magnitude_quadrant_4' => number_format($magnitude_quadrant_4 / 1000, 3, '.', ''),
                                    'method' => $method,
                                    'indicator' => $indicator,
                                    'invoice' => $invoice,
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'download_id' => $distributorsDownload->id
                                ],
                                false
                            );
                        } else {
                            $distributorsLogsRepository->addErrorLog(
                                [
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'message' => 'Formato incorrecto de F5D en la lectura: ' . $line
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
