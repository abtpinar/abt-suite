<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use JWTAuth;


/**
 * Class ProtectedControllerBase
 *
 * Base class that every controller handling protected routes should inherit.
 *
 * @package App\Http\Controllers
 */
abstract class ProtectedControllerBase extends Controller
{
    /**
     * Gets the authenticated user using a request provided Json Web Token, and puts it in the response
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }
}
