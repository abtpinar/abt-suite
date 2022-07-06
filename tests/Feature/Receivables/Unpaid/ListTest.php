<?php

namespace Tests\Feature\Receivables\Unpaid;

use Tests\TestCase;
use App\Data\Entities\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class ListTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testUnpaid()
    {
        $user = User::where('email', config('test.user_credentials.username'))->first();
        $token = JWTAuth::fromUser($user);
        
        $baseUrl = '/api/v1/unpaid';
        $response = $this->get($baseUrl, ['Authorization' => "Bearer $token"]);

        $response->assertStatus(200);
    }
}
