<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\Users\AddUser\AddUser;
use App\User;
use Illuminate\Http\Request;

/**
 * Class RegisterController
 *
 * Controller with the actions to register a new user in the system.
 *
 * @package App\Http\Controllers\Auth
 */
class RegisterController extends Controller
{
    /**
     * Create a new user instance after a valid registration.
     *
     * @param Request $request
     * @throws
     */
    protected function register(Request $request)
    {
        $data = $request->all();

        $request->validate(
            [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]
        );

        $data["active"] = 1;
        $job = app(AddUser::class, ["data" => $data]);

        return $this->dispatch($job);
    }
}
