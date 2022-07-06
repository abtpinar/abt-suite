<?php

namespace App\Http\Controllers\Auth;

use App\Data\Entities\User;
use App\Data\Repositories\Contracts\UsersRepository;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use JWTAuth;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\JWTException;

/**
 * Class AuthController
 *
 * This controller handles the authentication and registration of the users in the system.
 *
 * @package App\Http\Controllers\Auth
 */
class AuthController extends Controller
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
    public function login(Request $request)
    {
        $data = $request->only('username', 'password');
        $credentials['email'] = $data['username'];
        $credentials['password'] = $data['password'];
        $token = null;

        try {
            // attempt to verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return $this->apiErrorResponse(['error' => 'invalid_credentials'], [], [], 401);
            }

            $user = User::where('email', $credentials['email'])->first();

            if (!$user->active) {
                return $this->apiErrorResponse(['error' => 'invalid_credentials'], [], [], 401);
            }

            $user->roles;
            return $this->apiOkResponse(['token' => $token, 'user' => $user->toJson()]);
        } catch (JWTException $e) {
            $responseMessage = env('APP_ENV') == 'dev' ? $e : 'could_not_create_token';
            return $this->apiErrorResponse(['error' => $e], [], [], 500);
        }
    }

    /**
     * Log out
     * Invalidate the token, so user cannot use it anymore
     * They have to relogin to get a new token
     *
     * @param Request $request
     */
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate($request->input('token'));
            return response(
                [
                    'status' => 'success',
                    'msg' => 'You have successfully logged out.'
                ]
            );
        } catch (JWTException $e) {
            logger()->error('something went wrong whilst attempting to encode the token', [$e]);
            return response(
                [
                    'status' => 'error',
                    'msg' => 'Failed to logout, please try again.'
                ]
            );
        }
    }

    public function refresh(Request $request)
    {
        if (JWTAuth::parser()->setRequest($request)->hasToken()) {
            try {
                $newToken = JWTAuth::parseToken()->refresh();

                return $this->apiOkResponse(['token' => $newToken, 'success' => true]);
                // return response()->json([
                // 		'token' => $newToken,
                // 		'success' => true
                // ], 200);

            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
                throw new UnauthorizedHttpException('jwt-auth', $e->getMessage(), $e, $e->getCode());
            }
        }
        throw new UnauthorizedHttpException('jwt-auth', 'Token not provided');
    }
}
