<?php

namespace App\Support;

class Constants
{
    /**
     * Response Code
     */
    const RESPONSE_CODE_AUTHENTICATION_EXCEPTION = 401;
    const RESPONSE_CODE_AUTHORIZATION_EXCEPTION = 403;
    const RESPONSE_CODE_ERROR = 500;
    const RESPONSE_CODE_INVALID_API_CLIENT_EXCEPTION = "C403";
    const RESPONSE_CODE_METHOD_NOT_ALLOWED_EXCEPTION = 405;
    const RESPONSE_CODE_MODEL_NOT_FOUND_EXCEPTION = "R404";
    const RESPONSE_CODE_NOT_FOUND_HTTP_EXCEPTION = 404;
    const RESPONSE_CODE_PARSE_FILTER_EXCEPTION = 400;
    const RESPONSE_CODE_SUCCESS = 200;
    const RESPONSE_CODE_VALIDATION_FAILED = 422;

    /**
     * Response HTTP Code
     */
    const RESPONSE_HTTP_CODE_AUTHENTICATION_EXCEPTION = 401;
    const RESPONSE_HTTP_CODE_AUTHORIZATION_EXCEPTION = 403;
    const RESPONSE_HTTP_CODE_ERROR = 500;
    const RESPONSE_HTTP_CODE_INVALID_API_CLIENT_EXCEPTION = 403;
    const RESPONSE_HTTP_CODE_METHOD_NOT_ALLOWED_EXCEPTION = 405;
    const RESPONSE_HTTP_CODE_MODEL_NOT_FOUND_EXCEPTION = 404;
    const RESPONSE_HTTP_CODE_NOT_FOUND_HTTP_EXCEPTION = 404;
    const RESPONSE_HTTP_CODE_PARSE_FILTER_EXCEPTION = 400;
    const RESPONSE_HTTP_CODE_SUCCESS = 200;
    const RESPONSE_HTTP_CODE_VALIDATION_FAILED = 422;

    /**
     * Response Messages
     */
    const RESPONSE_MESSAGE_AUTHENTICATION_EXCEPTION = "Unauthenticated.";
    const RESPONSE_MESSAGE_AUTHORIZATION_EXCEPTION = "Unauthorized to access resource.";
    const RESPONSE_MESSAGE_ERROR = "Whoops, looks like something went wrong, if the error continues contact technical support.";
    const RESPONSE_MESSAGE_INVALID_API_CLIENT_EXCEPTION = "Invalid API client.";
    const RESPONSE_MESSAGE_METHOD_NOT_ALLOWED_EXCEPTION = "The request method is not allowed.";
    const RESPONSE_MESSAGE_MODEL_NOT_FOUND_EXCEPTION = "The resource you are looking for does not exist.";
    const RESPONSE_MESSAGE_NOT_FOUND_HTTP_EXCEPTION = "The uri requested does not exist.";
    const RESPONSE_MESSAGE_PARSE_FILTER_EXCEPTION = "Error parsing the filters provided.";
    const RESPONSE_MESSAGE_SUCCESS = "Good job! Keep working hard.";
    const RESPONSE_MESSAGE_VALIDATION_FAILED = "The given data failed to pass validation.";

    /**
     * Response Status
     */
    const RESPONSE_STATUS_SUCCESS = "OK";
    const RESPONSE_STATUS_ERROR = "ERROR";

    /**
     * Pagination
     */
    const PAGINATION_SIZE = 10;

    /**
     * DEFAULT DATE FORMAT
     */
    const DEFAULT_DATE_FORMAT = 'd/m/Y';

    /**
     * Directories
     */
    const TEMP_DIR = 'tempdir';
    const QUEUE_DIR = 'response_queue';

    /**
     * Entities Status
     */
    const DISTRIBUTOR_RESPONSE_QUEUE_STATUS_PENDING = 'PENDING';
    const DISTRIBUTOR_RESPONSE_QUEUE_STATUS_PROCESSED = 'PROCESSED';
    const DISTRIBUTOR_RESPONSE_QUEUE_STATUS_FAILED = 'FAILED';
}