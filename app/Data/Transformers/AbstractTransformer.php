<?php

namespace App\Data\Transformers;

use Carbon\Carbon;
use League\Fractal\TransformerAbstract as Transformer;

abstract class AbstractTransformer extends Transformer
{
    /**
     * @param     $string
     *
     * @return mixed
     */
    public static function doubleScapeNewLineCharacter($string)
    {
        $replace = '\\' . '\n';
        $search = ["\n", "\r", "\n\r"];

        return str_replace($search, $replace, $string);
    }

    /**
     * @param $carbon
     *
     * @return bool
     */
    public function validDateProperty($carbon)
    {
        if (empty($carbon) || !$carbon instanceof Carbon || $carbon->year <= 0) {
            return false;
        }

        return true;
    }
}