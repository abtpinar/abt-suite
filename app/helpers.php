<?php

if (!function_exists('curl_token')) {
    /**
     * Encrypt a string using a salt.
     *
     * @param bool $encrypted
     *
     * @return array
     */
    function curl_token($encrypted = false)
    {
        $token = config('admin.curl_token');

        if (empty($token)) {
            abort(500, 'Invalid (empty) curl token.');
        }

        return !$encrypted ? $token : bcrypt($token);
    }
}

if (!function_exists('curl_url')) {
    /**
     * Encrypt a string using a salt.
     *
     * @param       $url
     * @param bool $verifySSL
     * @param array $options
     *
     * @return array
     */
    function curl_url($url, $verifySSL = false, $options = [])
    {
        $response = null;

        $headers = isset($options['headers']) ? $options['headers'] : [];

        $headers[] = "Authentication-Token: " . curl_token(true);
        $headers[] = "User-Agent: " . config('admin.admin_name') . "-Curl-Request";

        $conn = curl_init($url);

        curl_setopt($conn, CURLOPT_SSL_VERIFYPEER, $verifySSL);
        curl_setopt($conn, CURLOPT_FRESH_CONNECT, true);
        curl_setopt($conn, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($conn, CURLOPT_FOLLOWLOCATION, 1);
        curl_setopt($conn, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($conn, CURLOPT_BINARYTRANSFER, 1);

        $response = (curl_exec($conn));

        curl_close($conn);

        return $response;
    }
}

if (!function_exists('default_value')) {
    /**
     * @param        $value
     * @param string $default
     *
     * @return string
     */
    function default_value($value, $default = "")
    {
        if (empty($value)) {
            return $default;
        }

        return $value;
    }
}

if (!function_exists('dump')) {
    /**
     * @param $var
     */
    function dump($var)
    {
        foreach (func_get_args() as $var) {
            \Symfony\Component\VarDumper\VarDumper::dump($var);
        }
    }
}

if (!function_exists('format_number')) {
    /**
     * @param     $number
     * @param int $decimal
     *
     * @return string
     */
    function format_number($number, $decimal = 2)
    {
        return number_format((float)$number, $decimal);
    }
}

if (!function_exists('js_json_encode')) {
    /**
     * Make a json encode of any data, but
     * escaping the "\n" character
     *
     * @param  $data
     *
     * @return string
     */
    function js_json_encode($data)
    {
        return addslashes(json_encode($data));
    }
}

if (!function_exists('regular_case')) {
    /**
     * Convert any version of a string to regular case
     *
     * @param  $string
     *
     * @return string
     */
    function regular_case($string)
    {
        return str_replace('-', ' ', snake_case($string, "-"));
    }
}

if (!function_exists('valid_date')) {
    /**
     * Check if a string value is a valid date
     *
     * @param $date
     * @param $format
     *
     * @return string
     */
    function valid_date($date, $format)
    {
        if (empty($date)) {
            return false;
        }

        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) == $date;
    }
}

if (!function_exists('whitespace_snake_case')) {
    /**
     * Convert any version of a string to regular case
     *
     * @param  $string
     *
     * @return string
     */
    function whitespace_snake_case($string)
    {
        return strtolower(implode("_", explode(" ", $string)));
    }
}