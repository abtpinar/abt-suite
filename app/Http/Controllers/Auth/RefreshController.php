<?php

namespace App\Http\Controllers\Auth;

use App\Data\Repositories\Contracts\UsersRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;


/**
 * Class RefreshController
 *
 *
 * @package App\Http\Controllers\Auth
 */
class RefreshController extends Controller
{
    private $userRepository;


    public function __construct(UsersRepository $usersRepository)
    {
        $this->userRepository = $usersRepository;
    }


    /**
     * Attempts to log a user in.
     *
     * @param Request $request : Has the details of the received login request.
     * @return \Illuminate\Http\JsonResponse with status code of 401 if credentials are incorrect, 500 if an error
     * occurs or a 200 with a token and a user if the authentication succeeded.
     */
    public function refresh(Request $request)
    {
        try {
            $token = JWTAuth::getToken();
            if ($token) {
                $token = JWTAuth::refresh($token);
                return $this->apiOkResponse(['token' => $token]);
            }
            return $this->apiErrorResponse(['error' => 'could_not_create_token'], [], [], 500);
        } catch (JWTException $e) {
            return $this->apiErrorResponse(['error' => 'could_not_create_token'], [], [], 500);
        }
    }
}