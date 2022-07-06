<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tymon\JWTAuth\JWT;
use App\Data\Entities\User;
use Auth;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class LoginTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testLogin()
    {
        $baseUrl = '/api/v1/login';
        $email = config('test.user_credentials.username');
        $password = config('test.user_credentials.password');

        $response = $this->post($baseUrl, [
            'username' => $email,
            'password' => $password
        ]);

        logger('login', [$response]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'response' => ['token', 'user']
            ]);
    }

    /**
    * Test logout.
    *
    * @return void
    */
    public function testLogout()
    {
        $user = User::where('email', config('test.user_credentials.username'))->first();
        $token = JWTAuth::fromUser($user);

        logger('token', [$token]);

        $baseUrl = '/api/v1/logout';

        $response = $this->get($baseUrl, ['Authorization' => "Bearer $token"]);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                'message' => 'Successfully logged out'
            ]);
    }
}
