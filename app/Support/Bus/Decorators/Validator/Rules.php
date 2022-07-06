<?php namespace App\Support\Bus\Decorators\Validator;

use Cviebrock\ImageValidator\ImageValidatorServiceProvider;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class Rules
{
    public function registerRules()
    {
        $this->registerImagesRules();
        $this->notExistsRule();
        $this->invalidRule();
        $this->greaterThanRule();
        $this->instanceOfClass();
        $this->cupsUniqueRule();
    }

    protected function registerImagesRules()
    {
        app()->register(ImageValidatorServiceProvider::class);
    }

    protected function notExistsRule()
    {
        Validator::extend(
            'not_exists',
            function ($attribute, $value, $parameters) {
                $column = isset($parameters[1]) ? $parameters[1] : $attribute;

                $records = DB::table($parameters[0])
                    ->where($column, '=', $value)
                    ->count();

                if ($records > 0) {
                    return false;
                }

                return true;
            }
        );

        Validator::replacer(
            'not_exists',
            function ($message, $attribute, $rule, $parameters) {
                $name = isset($parameters[2]) ? $parameters[2] : $attribute . ' field value';

                $message = str_replace(':placeholder', $name, $message);
                $message = str_replace(':table', $parameters[0], $message);

                return $message;
            }
        );
    }

    protected function invalidRule()
    {
        Validator::extend(
            'invalid',
            function ($attribute, $value, $parameters) {
                return false;
            }
        );

        Validator::replacer(
            'invalid',
            function ($message, $attribute, $rule, $parameters) {
                $name = isset($parameters[2]) ? $parameters[2] : $attribute . ' field value';

                $message = str_replace(':placeholder', $name, $message);

                return $message;
            }
        );
    }

    protected function greaterThanRule()
    {
        Validator::extend(
            'greater_than',
            function ($attribute, $value, $parameters) {
                if (!isset($parameters[1])) {
                    return $value > $parameters[0];
                } else {
                    return $value >= $parameters[0];
                }
            }
        );

        Validator::replacer(
            'greater_than',
            function ($message, $attribute, $rule, $parameters) {
                if (!isset($parameters[1])) {
                    $operatorMsg = 'greater than';
                } else {
                    $operatorMsg = 'greater or equal than';
                }

                $output = str_replace(':field', regular_case($attribute), $message);
                $output = str_replace(':operator', $operatorMsg, $output);
                $output = str_replace(':value', $parameters[0], $output);

                return $output;
            }
        );
    }

    protected function instanceOfClass()
    {
        Validator::extend(
            'instanceOf',
            function ($attribute, $value, $parameters) {
                $class = trim($parameters[0]);

                return ($value instanceOf $class);
            }
        );

        Validator::replacer(
            'instanceOf',
            function ($message, $attribute, $rule, $parameters) {
                $message = str_replace(':attribute', $attribute, $message);
                $message = str_replace(':class', $parameters[0], $message);

                return $message;
            }
        );
    }

    protected function cupsUniqueRule()
    {
        Validator::extend(
            'cups_unique',
            function ($attribute, $value, $parameters) {
                $uniquePortion = substr($value, 0, 20);

                $records = DB::table($parameters[0])
                    ->where('cups', 'LIKE', '%' . $uniquePortion . '%');

                if (isset($parameters[1])) {
                    $records->where('id', '<>', $parameters[1]);
                }

                if ($records->count() == 0) {
                    return true;
                }

                return false;
            }
        );

        Validator::replacer(
            'cups_unique',
            function ($message, $attribute, $rule, $parameters) {
                $name = isset($parameters[2]) ? $parameters[2] : $attribute . ' field value';

                $message = str_replace(':placeholder', $name, $message);
                $message = str_replace(':table', $parameters[0], $message);

                return $message;
            }
        );
    }

    //@todo add iban, nif/cif/nie validation rules
}