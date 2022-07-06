<?php

namespace App\Http\Controllers\CodeTables;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;

class CodeTablesController extends Controller
{

    public function getCodes($table_key)
    {
        $codes = \Config::get('code_tables.' . env('APP_BRAND', 'tabacosj') . '.' . $table_key);

        if (!$codes) {
            return response()->json(
                [
                    'success' => false,
                    'message' => "A Codes Table for key '" . $table_key . "' was not found"
                ],
                404
            );
        }

        return response($codes);
    }

    public function getCodesCombined(Request $request)
    {
        if (Input::get('keys')) {
            $tableKeys = explode(",", Input::get('keys'));
            $combined = [];
            foreach ($tableKeys as $key) {
                $codes = \Config::get('code_tables.' . env('APP_BRAND', 'tabacosj') . '.' . $key);
                if ($codes) {
                    $combined[$key] = $codes;
                }
            }

            return response()->json(
                [
                    'combinedTableCodes' => $combined
                ]
            );
        }
        return response()->json(
            [
                'success' => false,
                'message' => "Malformed request. Keys parameter must be present in the querystring"
            ],
            400
        );
    }
}
