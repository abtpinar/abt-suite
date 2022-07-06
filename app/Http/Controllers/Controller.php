<?php

namespace App\Http\Controllers;

use App\Support\Bus\DispatcherTrait;
use App\Support\Constants;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests, DispatcherTrait;

    /**
     * @param $data
     * @return JsonResponse
     */
    public function apiResponseFromJobResult($data)
    {
        if (!array_key_exists('status', $data) || !array_key_exists('data', $data)) {
            return $this->apiErrorResponse("Unknown error");
        }

        $isError = $data['status'] == Constants::RESPONSE_STATUS_ERROR;

        return $this->apiFormattedResponse(
            $data['status'],
            $isError ? Constants::RESPONSE_CODE_ERROR : Constants::RESPONSE_CODE_SUCCESS,
            $isError ? [Constants::RESPONSE_MESSAGE_ERROR] : [Constants::RESPONSE_MESSAGE_SUCCESS],
            $data['data'],
            $isError ? Constants::RESPONSE_HTTP_CODE_ERROR : Constants::RESPONSE_HTTP_CODE_SUCCESS
        );
    }

    /**
     * @param string|array $data
     * @param array $messages
     * @param int|string $responseCode
     * @param int $httpCode
     *
     * @return JsonResponse
     */
    public function apiErrorResponse(
        $data,
        array $messages = [Constants::RESPONSE_MESSAGE_ERROR],
        $responseCode = Constants::RESPONSE_CODE_ERROR,
        $httpCode = 500
    ) {
        return $this->apiFormattedResponse(
            Constants::RESPONSE_STATUS_ERROR,
            $responseCode,
            $messages,
            $data,
            $httpCode
        );
    }

    /**
     * @param       $status ["OK", "ERROR"]
     * @param       $responseCode "Dynamic response code"
     * @param array $messages []
     * @param       $data
     *
     * @param       $httpCode
     *
     * @return JsonResponse
     */
    public function apiFormattedResponse($status, $responseCode, array $messages, $data, $httpCode)
    {
        return response()->json(
            [
                "status" => $status,
                "response_code" => $responseCode,
                "messages" => $messages,
                "response" => $data,
            ],
            $httpCode
        );
    }

    /**
     * @param       $data
     * @param array $messages
     * @param int $responseCode
     *
     * @param int $httpCode
     *
     * @return JsonResponse
     */
    public function apiOkResponse(
        $data,
        array $messages = [Constants::RESPONSE_MESSAGE_SUCCESS],
        $responseCode = Constants::RESPONSE_CODE_SUCCESS,
        $httpCode = 200
    ) {
        return $this->apiFormattedResponse(
            Constants::RESPONSE_STATUS_SUCCESS,
            $responseCode,
            $messages,
            $data,
            $httpCode
        );
    }
}
