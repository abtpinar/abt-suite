<?php

namespace App\Helpers;

class generalHelper
{
    /**
     * This method gets all the values that they are incoming to the method,
     * and this method returns the first one that it is not null and also not
     * empty.
     *
     * @param array       func_get_args       Todos los parámetros que se le metan a la función, sin
     *                                              un límite determinado.
     *
     * @return      mixed                           False if there is raised an exception or all the parameters
     *                                              all null/empty. The first value not null and also not empty
     *                                              is returned.
     */
    public static function coalesce()
    {
        try {
            //all the method parameters are returned by func_get_args function we get all the param, from the 
            //first until the last. The first value not null, and also not empty, is returned
            $params = func_get_args();
            foreach ($params as $param) {
                $param = trim($param);
                if (isset($param) && !empty($param)) {
                    return $param;
                }
            }

            return $params[count($params) - 1];
            //if there isnot any not null and also not empty value, we return false.
            //return false;
        } catch (Exception $ex) {
            //if there is raised an exception, we return false.
            return false;
        }
    }

    /**
     * This method decodes the error codes returned by the app.
     *
     * @param integer $code The code of the error to be decoded
     *
     * @return  string                      The meaning of the error code
     *
     */
    public static function decodeErrorCodes($code)
    {
        switch ($code) {
            case 1:
                return 'Ni la fecha de inicio ni la fecha de fin pueden estar vacías y deben ser fechas correctas.';
            case 2:
                return 'La fecha de fin no puede ser mayor que 1 mes después de la fecha de inicio.';
            case 3:
                return 'Han existido problemas para realizar la consulta solicitada.';
            case 4:
                return 'Ha existido algún problema procesando la solicitud.';
        }
    }

    /*
     * This method fills a string with characters in order to get the required length.
     * The characters to be filled depends of the variableType. If variable type is N (number)
     * the 0 will be the char used to fill the string upto the total length. If it is not N
     * the char used to fill the string is space.
     * 
     * @param       string      $text           The value to be filled
     * @param       integer     $length         The length required for the $value string
     * @param       string      $padString      The string used to pad the original string
     * @param       integer     $padType        The type of padding for the generated string
     * @param       string      $coding         The coding for the string
     * 
     * @return      string                      A string with the length $length
     */
    public static function charFill($text, $length, $padString = ' ', $padType = STR_PAD_RIGHT, $coding = null)
    {
        $tmpString = @FormatHelper::mb_str_pad(trim($text), $length, $padString, $padType, $coding);

        $tmpString = self::replaceVocalesAcentuadas($tmpString);

        $tmpString = preg_replace('/[^A-ZÑ0-9\-Çç.\/]/', ' ', $tmpString); // Rem

        $tmpString = mb_substr($tmpString, 0, $length);

        return $tmpString;
    }

    /**
     * This method returns the same string having replaced accentued upper case vocals
     *
     * @param string $line The string to be converted
     *
     * @return  string                  The string with all the chars converted
     */
    public static function replaceVocalesAcentuadas($line)
    {
        $line = str_replace('Á', 'A', $line);
        $line = str_replace('À', 'A', $line);

        $line = str_replace('É', 'E', $line);
        $line = str_replace('È', 'E', $line);

        $line = str_replace('Í', 'I', $line);
        $line = str_replace('Ì', 'I', $line);

        $line = str_replace('Ó', 'O', $line);
        $line = str_replace('Ò', 'O', $line);

        $line = str_replace('Ú', 'U', $line);
        $line = str_replace('Ù', 'U', $line);
        $line = str_replace('Ü', 'U', $line);

        return $line;
    }


    /**
     * This method converts an array of strings into a string. Each position of the array is separated using PHP_EOL constant
     *
     * @param array $arrayText Array of string to be converted
     *
     * @return  string                      The content of the array converted to a string
     */
    public static function createTextFromArray($arrayText)
    {
        $finalText = '';

        foreach ($arrayText as $linea) {
            $finalText .= $linea . PHP_EOL;
        }

        return $finalText;
    }


    public static function arraySum($arrayValues)
    {
        try {
            $totalSum = 0;
            foreach ($arrayValues as $value) {
                $totalSum += $value;
            }

            $totalSum = round($totalSum, 2);

            return [
                'parteEntera' => floor($totalSum),
                'parteDecimal' => $totalSum - floor($totalSum)
            ];
        } catch (Exception $ex) {
            return 0;
        }
    }


    /**
     * This method converts the utf8 charset of the specified string to ISO-8851-1 charset
     *
     * @param string $stringToConvert String to be converted
     *
     * @return  string                                  String converted to ISO-8851-1
     */
    public static function convert_UTF8Charset_To_ISO8851_1Charset($stringToConvert)
    {
        try {
            $tmpLinea = utf8_decode($stringToConvert);
        } catch (Exception $ex) {
            return '';
        }

        return $tmpLinea;
    }


    /**
     * This method validates a specific NIF.
     *
     * @param string $documento The NIF to be validated
     * @return  boolean                       True if the NIF is valid, false if not
     *
     */
    public static function validateNifCifNie($documento)
    {
        try {
            $documento = strtoupper($documento);

            if (preg_match('~(^[XYZ\d]\d{7})([TRWAGMYFPDXBNJZSQVHLCKE]$)~', $documento, $parts)) {
                $control = 'TRWAGMYFPDXBNJZSQVHLCKE';
                $nie = ['X', 'Y', 'Z'];
                $parts[1] = str_replace(array_values($nie), array_keys($nie), $parts[1]);
                $cheksum = substr($control, $parts[1] % 23, 1);

                return ($parts[2] == $cheksum);
            } elseif (preg_match('~(^[ABCDEFGHIJKLMUV])(\d{7})(\d$)~', $documento, $parts)) {
                $checksum = 0;

                foreach (str_split($parts[2]) as $pos => $val) {
                    $checksum += array_sum(str_split($val * (2 - ($pos % 2))));
                }

                $checksum = ((10 - ($checksum % 10)) % 10);

                return ($parts[3] == $checksum);
            } elseif (preg_match('~(^[KLMNPQRSW])(\d{7})([JABCDEFGHI]$)~', $documento, $parts)) {
                $control = 'JABCDEFGHI';
                $checksum = 0;

                foreach (str_split($parts[2]) as $pos => $val) {
                    $checksum += array_sum(str_split($val * (2 - ($pos % 2))));
                }

                $checksum = substr($control, ((10 - ($checksum % 10)) % 10), 1);

                return ($parts[3] == $checksum);
            }

            return false;
        } catch (Exception $exc) {
        }
        return false;
    }
}