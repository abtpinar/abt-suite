<?php namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpKernel\Exception\HttpException;

class ApiKeyValidation
{

    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->header('Api-Key') != env('API_KEY')) {
            throw new HttpException(403, 'Acceso prohibido, el valor de Api-Key es incorrecto o no fue enviado!');
        }

        return $next($request);
    }

}
