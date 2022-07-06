<?php

namespace App\Helpers;


class TableCodeHelper
{
    /**
     * Find row by table.
     *
     * @param $description
     * @param $table_key
     * @return array->[code,description]
     */
    public static function FindRowByCode($description, $table_key)
    {
        $tableValues = \Config::get('code_tables.' . $table_key);
        foreach ($tableValues as $key => $value) {
            if ($value['description'] == $description) {
                return $value;
            }
        }

        return null;
    }

    /**
     * @param $code
     * @param $table_key
     * @return string|null
     */
    public static function FindRowByCodeSelected($code, $table_key)
    {
        $tableValues = \Config::get('code_tables.' . $table_key);

        foreach ($tableValues as $key => $value) {
            if ($value['code'] == $code) {
                return $value;
            }
        }

        return null;
    }

    /**
     * @param $data
     * @return string|null
     */
    public static function getCodeOrNullForBooleanNotRequiredData($data)
    {
        $code = null;

        if ($data !== null) {
            $code = $data ? 'S' : 'N';
        }

        return $code;
    }
}
