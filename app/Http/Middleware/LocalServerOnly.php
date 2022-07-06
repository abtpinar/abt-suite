<?php

namespace App\Http\Middleware;

use Closure;

class LocalServerOnly
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
        if ($request->server('REMOTE_ADDR') != "127.0.0.1") {
            return response()->json(['message' => 'page not found'], 404);
        }

        return $next($request);
    }
}
