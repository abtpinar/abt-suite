<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Response as LaravelResponse;

class CheckBuildVersion
{
    /**
     * The URIs that should be excluded from verification.
     * @var array
     */
    protected $except = [
        'api/v1/login/',
        'api/v1/user/getUATEnv/',
        'api/v1/refresh/',
    ];

    /**
     * @param \Illuminate\Http\Request $request
     * @param Closure $next
     * @return mixed
     * @throws \Exception
     */
    public function handle($request, Closure $next)
    {
        if (
            $this->isReading($request) ||
            $this->inExceptArray($request) ||
            $this->checkBuildVersion($request)
        ) {
            return $next($request);
        }

        return new LaravelResponse('Invalid build version.', 522);
    }

    /**
     * Determine if the HTTP request uses a ‘read’ verb.
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    protected function isReading($request)
    {
        return in_array($request->method(), ['HEAD', 'OPTIONS']);
    }

    /**
     * Determine if the request has a URI that should pass through CSRF verification.
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    protected function inExceptArray($request)
    {
        foreach ($this->except as $except) {
            if ($except !== '/') {
                $except = trim($except, '/');
            }

            if ($request->fullUrlIs($except) || $request->is($except)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return bool
     */
    public function checkBuildVersion($request)
    {
        $buildVersion = $request->header('Build-Version');

        if ($buildVersion && env("BUILD_VERSION", 0) > $buildVersion) {
            return false;
        }

        return true;
    }
}
