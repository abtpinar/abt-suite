<?php

namespace App\Support\Readers;

use Carbon\Carbon;
use App\Helpers\InvoicesHelper;
use App\Data\Entities\DistributorsDownload;
use App\Data\Repositories\Contracts\DistributorsLogsRepository;
use App\Data\Repositories\Contracts\DistributorImportsRepository;

class P1DReader implements IReader
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
                    $dateTime = !empty($elements[2]) ? Carbon::createFromFormat('Y/m/d H:i:s', $elements[2]) : null;
                    $origin = 'p1d';
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
                        $season = $elements[3] !== null && is_numeric($elements[3]) ? (int)$elements[3] : null;
                        $incoming_magnitude = !empty($elements[4]) && is_numeric($elements[4])
                                            ? (float)$elements[4]
                                            : ($elements[4] == 0 ? 0 : null);
                        $quality_incoming_magnitude = !empty($elements[5]) && is_numeric(
                            $elements[5]
                        ) ? (float)$elements[5] : null;
                        $outgoing_magnitude = !empty($elements[6]) && is_numeric(
                            $elements[6]
                        ) ? (float)$elements[6] : null;
                        $quality_outgoing_magnitude = !empty($elements[7]) && is_numeric(
                            $elements[7]
                        ) ? (float)$elements[7] : null;
                        $magnitude_quadrant_1 = !empty($elements[8]) && is_numeric(
                            $elements[8]
                        ) ? (float)$elements[8] : null;
                        $quality_magnitude_quadrant_1 = !empty($elements[9]) && is_numeric(
                            $elements[9]
                        ) ? (float)$elements[9] : null;
                        $magnitude_quadrant_2 = !empty($elements[10]) && is_numeric(
                            $elements[10]
                        ) ? (float)$elements[10] : null;
                        $quality_magnitude_quadrant_2 = !empty($elements[11]) && is_numeric(
                            $elements[11]
                        ) ? (float)$elements[11] : null;
                        $magnitude_quadrant_3 = !empty($elements[12]) && is_numeric(
                            $elements[12]
                        ) ? (float)$elements[12] : null;
                        $quality_magnitude_quadrant_3 = !empty($elements[13]) && is_numeric(
                            $elements[13]
                        ) ? (float)$elements[13] : null;
                        $magnitude_quadrant_4 = !empty($elements[14]) && is_numeric(
                            $elements[14]
                        ) ? (float)$elements[14] : null;
                        $quality_magnitude_quadrant_4 = !empty($elements[15]) && is_numeric(
                            $elements[15]
                        ) ? (float)$elements[15] : null;
                        $reserve_magnitude_1 = !empty($elements[16]) && is_numeric(
                            $elements[16]
                        ) ? (float)$elements[16] : null;
                        $quality_reserve_magnitude_1 = !empty($elements[17]) && is_numeric(
                            $elements[17]
                        ) ? (float)$elements[17] : null;
                        $reserve_magnitude_2 = !empty($elements[18]) && is_numeric(
                            $elements[18]
                        ) ? (float)$elements[18] : null;
                        $quality_reserve_magnitude_2 = !empty($elements[19]) && is_numeric(
                            $elements[19]
                        ) ? (float)$elements[19] : null;
                        $method = !empty($elements[20]) && is_numeric($elements[20]) ? (int)$elements[20] : null;
                        $indicator = !empty($elements[21]) && is_numeric($elements[21]) ? (int)$elements[21] : null;

                        if (null !== $cups && null !== $dateTime && null !== $season && 11 === $control) {
                            $distributorImportsRepository->add(
                                [
                                    'cups' => $cups,
                                    'date' => $dateTime->format('Y-m-d H:i:s'),
                                    'duplicated' => $duplicated,
                                    'origin' => $origin,
                                    'season' => $season,
                                    'incoming_magnitude' => $incoming_magnitude,
                                    'quality_incoming_magnitude' => $quality_incoming_magnitude,
                                    'outgoing_magnitude' => $outgoing_magnitude,
                                    'quality_outgoing_magnitude' => $quality_outgoing_magnitude,
                                    'magnitude_quadrant_1' => $magnitude_quadrant_1,
                                    'quality_magnitude_quadrant_1' => $quality_magnitude_quadrant_1,
                                    'magnitude_quadrant_2' => $magnitude_quadrant_2,
                                    'quality_magnitude_quadrant_2' => $quality_magnitude_quadrant_2,
                                    'magnitude_quadrant_3' => $magnitude_quadrant_3,
                                    'quality_magnitude_quadrant_3' => $quality_magnitude_quadrant_3,
                                    'magnitude_quadrant_4' => $magnitude_quadrant_4,
                                    'quality_magnitude_quadrant_4' => $quality_magnitude_quadrant_4,
                                    'reserve_magnitude_1' => $reserve_magnitude_1,
                                    'quality_reserve_magnitude_1' => $quality_reserve_magnitude_1,
                                    'reserve_magnitude_2' => $reserve_magnitude_2,
                                    'quality_reserve_magnitude_2' => $quality_reserve_magnitude_2,
                                    'method' => $method,
                                    'indicator' => $indicator,
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'download_id' => $distributorsDownload->id
                                ],
                                false
                            );
                        } else {
                            $distributorsLogsRepository->addErrorLog(
                                [
                                    'distributor_id' => $distributorsDownload->distributor_id,
                                    'message' => 'Formato incorrecto de P1 en la lectura: ' . $line
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
