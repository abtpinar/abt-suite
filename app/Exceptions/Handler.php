<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param \Exception $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Exception $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ($exception instanceof \Symfony\Component\HttpKernel\Exception\NotFoundHttpException) {
            View::addExtension('html', 'php');
            return new Response(View::make('index'));
        }

        if ($exception instanceof UnauthorizedHttpException) {
            if ($exception->getMessage() == 'The token has been blacklisted'
                || $exception->getMessage() == 'Token has expired and can no longer be refreshed') {
                return env('APP_ENV') == 'dev' ?
                    response($exception, 403)
                    :
                    response()->json(
                        [
                            'error' => 'Token blacklisted'
                        ],
                        403
                    );
            } elseif ($exception->getMessage() == 'Token has expired') {
                return env('APP_ENV') == 'dev' ?
                    response($exception, 419)
                    :
                    response()->json(
                        [
                            'error' => 'Token expired'
                        ],
                        419
                    );
            } else {
                return parent::render($request, $exception);
            }
        }

        return parent::render($request, $exception);
    }
}
