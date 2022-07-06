<?php

namespace App\Support\Readers;

use App\Helpers\InvoicesHelper;
use App\Data\Entities\DistributorsDownload;
use App\Data\Repositories\Contracts\DistributorsLogsRepository;
use App\Data\Repositories\Contracts\DistributorImportsRepository;

class F1Reader implements IReader
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
                    $dateTime = !empty($elements[2]) ? new \DateTime($elements[2]) : null;
                    $origin = 'f1';
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
                        $control = !empty($elements[1]) && is_numeric($elements[1]) ? (int)$elements[1] : 0;
                        $period = $elements[3] !== null && is_numeric($elements[3]) ? (int)$elements[3] : null;
                        $incoming_magnitude = !empty($elements[4]) && is_numeric($elements[4])
                                                ? (float)$elements[4]
                                                : null;
                        $outgoing_magnitude = !empty($elements[5]) && is_numeric($elements[5])
                                                ? (float)$elements[5]
                                                : null;
                        $magnitude_quadrant_1 = !empty($elements[6]) && is_numeric(
                            $elements[6]
                        ) ? (float)$elements[6] : null;
                        $magnitude_quadrant_2 = !empty($elements[7]) && is_numeric(
                            $elements[7]
                        ) ? (float)$elements[7] : null;
                        $magnitude_quadrant_3 = !empty($elements[8]) && is_numeric(
                            $elements[8]
                        ) ? (float)$elements[8] : null;
                        $magnitude_quadrant_4 = !empty($elements[9]) && is_numeric(
                            $elements[9]
                        ) ? (float)$elements[9] : null;
                        $reserve_magnitude_1 = !empty($elements[10]) && is_numeric(
                            $elements[10]
                        ) ? (float)$elements[10] : null;
                        $reserve_magnitude_2 = !empty($elements[11]) && is_numeric(
                            $elements[11]
                        ) ? (float)$elements[11] : null;
                        $method = !empty($elements[12]) && is_numeric($elements[12]) ? (int)$elements[12] : null;
                        $indicator = !empty($elements[13]) && is_numeric($elements[13]) ? (int)$elements[13] : null;

                        if (null !== $cups && null !== $dateTime && null !== $period && 11 === $control) {
                            $distributorImportsRepository->add(
                                [
                                    'cups' => $cups,
                                    'date' => $dateTime,
                                    'duplicated' => $duplicated,
                                    'origin' => $origin,
                                    'season' => $period,
                                    'incoming_magnitude' => $incoming_magnitude,
                                    'outgoing_magnitude' => $outgoing_magnitude,
                                    'magnitude_quadrant_1' => $magnitude_quadrant_1,
                                    'magnitude_quadrant_2' => $magnitude_quadrant_2,
                                    'magnitude_quadrant_3' => $magnitude_quadrant_3,
                                    'magnitude_quadrant_4' => $magnitude_quadrant_4,
                                    'method' => $method,
                                    'indicator' => $indicator,
                                    'reserve_magnitude_1' => $reserve_magnitude_1,
                                    'reserve_magnitude_2' => $reserve_magnitude_2,
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'download_id' => $distributorsDownload->id
                                ],
                                false
                            );
                        } else {
                            $distributorsLogsRepository->addErrorLog(
                                [
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'message' => 'Formato incorrecto de F1 en la lectura: ' . $line
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
