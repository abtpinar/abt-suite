<?php

namespace App\Data\Entities;

use App\Support\Constants;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;
use InvalidArgumentException;
use OwenIt\Auditing\Contracts\Auditable;


abstract class AbstractEntity extends Model implements Auditable
{
    use \OwenIt\Auditing\Auditable;

    /**
     * @param $field
     * @param $value
     */
    public function formatDateOrNull($field, $value)
    {
        if (!$value) {
            $this->attributes[$field] = null;
        } else {
            if (preg_match("/^\d{1,2}\/\d{1,2}\/\d{4}$/", $value)) {
                $carbon = Carbon::createFromFormat("d/m/Y", $value);
                $this->attributes[$field] = $carbon->toDateString();
            } else {
                $this->attributes[$field] = $value;
            }
        }
    }

    /**
     * @param $field
     * @param $value
     */
    public function sanitizeEmptyStringToNull($field, $value)
    {
        if (is_string($value) && trim($value) == "") {
            $this->attributes[$field] = null;
        }

        $this->attributes[$field] = $value;
    }

    /**
     * Override parent toJson behavior to return an empty json object instead of an empty array
     * when the model attributes are empty
     * @param int $options
     * @return string
     */
    public function toJson($options = 0)
    {
        $jsonSerialized = $this->jsonSerialize();

        if (is_array($jsonSerialized) && count($jsonSerialized) == 0) {
            return json_encode($jsonSerialized, JSON_FORCE_OBJECT);
        }

        $encodedJson = parent::toJson($options);
        $replace = '\\' . '\n';
        $search = ['\n', '\r', '\n\r'];

        return str_replace($search, $replace, $encodedJson);
    }

    /**
     * Automatically apply the date format to model date fields
     */
    public function getAttribute($key)
    {
        if (in_array($key, $this->dates)) {
            if (array_key_exists($key, $this->attributes) && !is_null($this->attributes[$key])) {
                $timestamp = $this->attributes[$key];

                return Carbon::parse($timestamp)->format(Constants::DEFAULT_DATE_FORMAT);
            }
        } else {
            return parent::getAttribute($key);
        }
    }

    /**
     * Automatically apply the date format to model date fields
     */
    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->dates) && !is_null($value)) {
            try {
                $formatted = Carbon::createFromFormat('d/m/Y', $value);

                $this->attributes[$key] = $formatted;
            } catch (\Exception $e) {
                if ($e instanceof InvalidArgumentException) {
                    $this->attributes[$key] = Carbon::parse($value)->format('Y-m-d');
                } else {
                    Log::error(
                        'Error parsing date on ' . __CLASS__ . ' >>> A ' . get_class(
                            $e
                        ) . ' was caught, with message: ' . $e->getMessage()
                    );

                    return parent::setAttribute($key, $value);
                }
            }
        } else {
            return parent::setAttribute($key, $value);
        }
    }
}
