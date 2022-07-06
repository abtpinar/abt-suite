<?php

namespace App\Helpers;

use Carbon\Carbon;

class FormatHelper
{
    /**
     * @param $date
     * @return Carbon
     */
    public static function formatDate($date)
    {
        if (is_string($date) && $date !== '') {
            $dateExplode = explode('/', $date);
            $day = $dateExplode[0];
            $month = $dateExplode[1];
            $year = $dateExplode[2];

            $formated = Carbon::createFromDate($year, $month, $day);

            return $formated;
        } elseif ($date instanceof \DateTime) {
            return $date;
        }
    }

    /**
     * @param $date
     * @return string
     */
    public static function formatDateCalendar($date)
    {
        if (!is_null($date)) {
            $dateExplode = explode('-', $date);
            $day = $dateExplode[2];
            $month = $dateExplode[1];
            $year = $dateExplode[0];

            $formated = $day . '/' . $month . '/' . $year;

            return $formated;
        } else {
            return $date;
        }
    }

    public static function cleanString($data)
    {
        $str = self::formattedStringToUppercase($data);

        return strtr($str, ['ñ' => 'N', 'Ñ' => 'N', '´' => ' ', 'º' => '.', 'ª' => '.', '/' => '', '\\' => '']);
    }

    /**
     * @param $data
     * @return string
     */
    public static function formattedStringToUppercase($data)
    {
        $unwantedArray = [
            'Š' => 'S',
            'š' => 's',
            'Ž' => 'Z',
            'ž' => 'z',
            'À' => 'A',
            'Á' => 'A',
            'Â' => 'A',
            'Ã' => 'A',
            'Ä' => 'A',
            'Å' => 'A',
            'Æ' => 'A',
            'Ç' => 'C',
            'È' => 'E',
            'É' => 'E',
            'Ê' => 'E',
            'Ë' => 'E',
            'Ì' => 'I',
            'Í' => 'I',
            'Î' => 'I',
            'Ï' => 'I',
            'Ò' => 'O',
            'Ó' => 'O',
            'Ô' => 'O',
            'Õ' => 'O',
            'Ö' => 'O',
            'Ø' => 'O',
            'Ù' => 'U',
            'Ú' => 'U',
            'Û' => 'U',
            'Ü' => 'U',
            'Ý' => 'Y',
            'Þ' => 'B',
            'ß' => 'Ss',
            'à' => 'a',
            'á' => 'a',
            'â' => 'a',
            'ã' => 'a',
            'ä' => 'a',
            'å' => 'a',
            'æ' => 'a',
            'ç' => 'c',
            'è' => 'e',
            'é' => 'e',
            'ê' => 'e',
            'ë' => 'e',
            'ì' => 'i',
            'í' => 'i',
            'î' => 'i',
            'ï' => 'i',
            'ð' => 'o',
            'ò' => 'o',
            'ó' => 'o',
            'ô' => 'o',
            'õ' => 'o',
            'ö' => 'o',
            'ø' => 'o',
            'ù' => 'u',
            'ú' => 'u',
            'û' => 'u',
            'ý' => 'y',
            'þ' => 'b',
            'ÿ' => 'y'
        ];
        $str = strtr($data, $unwantedArray);

        $strUppercase = strtoupper($str);

        $strTrim = trim($strUppercase);

        return $strTrim;
    }

    /**
     * @param int:1-12 $month
     * @return mixed spanish month name
     */
    public static function getMonthNameFromNumber($month)
    {
        $months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ];

        return $months[$month - 1];
    }

    /**
     * @param int:1-12 $month
     * @return mixed spanish month short name
     */
    public static function getMonthShortNameFromNumber($month)
    {
        $months = [
            'Ene.',
            'Feb.',
            'Mar.',
            'Abr.',
            'May.',
            'Jun.',
            'Jul.',
            'Ago.',
            'Sep.',
            'Oct.',
            'Nov.',
            'Dic.'
        ];

        return $months[$month - 1];
    }

    /**
     * Get if it's a leap year
     *
     * @param $year
     * @return false|string
     */
    public static function isLeapYear($year)
    {
        return date('L', mktime(0, 0, 0, 1, 1, $year));
    }

    /**
     * @param $array
     * @return array with numeric index
     */
    public static function formatToNumericArray($array)
    {
        if (!array_key_exists('0', $array)) {
            return [$array];
        }

        return $array;
    }

    /**
     * @param $value
     * @return mixed
     */
    public static function formatToCurrency($value)
    {
        $result = str_replace('.', ',', $value);

        return $result;
    }

    /**
     * @param        $text
     * @param        $length
     * @param string $padString
     * @param int $padType
     * @param null $coding
     * @return string
     */
    public static function mb_str_pad($text, $length, $padString = ' ', $padType = STR_PAD_RIGHT, $coding = null)
    {
        $diff = empty($coding) ? (strlen($text) - mb_strlen($text)) : (strlen($text) - mb_strlen($text, $coding));

        return str_pad($text, ($length + $diff), $padString, $padType);
    }

    /**
     * @param $array
     * @param $xml
     */
    public static function arrayToXml($array, $xml)
    {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                if (array_key_exists('0', $value)) {
                    foreach ($value as $item => $data) {
                        $subnode = $xml->addChild("$key");

                        self::arrayToXml($data, $subnode);
                    }
                } else {
                    $subnode = $xml->addChild("$key");

                    self::arrayToXml($value, $subnode);
                }
            } else {
                $xml->addChild("$key", htmlspecialchars("$value"));
            }
        }
    }

    /**
     * @param      $input
     * @return array
     */
    public static function arrayFilterRecursiveForClean($input)
    {
        foreach ($input as &$value) {
            if (is_array($value)) {
                $value = self::arrayFilterRecursiveForClean($value);
            }
        }

        return array_filter(
            $input,
            function ($item) {
                return $item != null && $item !== '';
            }
        );
    }

    /**
     * @param $graph
     * @return string
     */
    public static function graphToBase64($graph)
    {
        $img = $graph->Stroke(_IMG_HANDLER);
        ob_start();
        imagepng($img);
        $img_data = ob_get_contents();
        ob_end_clean();

        return base64_encode($img_data);
    }

    /**
     * @param $status
     * @return mixed
     */
    public static function translateCLStatus($status)
    {
        $statusDictionary = [
            'IMPORTED' => 'Importado',
            'UPDATED' => 'Actualizado',
            'IN_PROGRESS' => 'En trámite',
            'FIXED_FEE' => 'Gasto Aplicado',
            'PAID' => 'Pagado',
            'FINISHED' => 'Finalizado'
        ];

        return array_key_exists($status, $statusDictionary) ? $statusDictionary[$status] : $status;
    }
}
