<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function a_user_can_register_and_login()
    {
        // Registro
        $response = $this->postJson('/api/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(201)
                 ->assertJsonStructure(['user' => ['id', 'name', 'email']]);

        // Login
        $response = $this->postJson('/api/login', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(200)
                 ->assertJsonStructure(['token']);
    }

    /** @test */
    public function a_user_can_logout()
    {
        $user = User::create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'),
        ]);

        $token = JWTAuth::fromUser ($user);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
                         ->postJson('/api/logout');

        $response->assertStatus(200)
                 ->assertJson(['message' => 'Logout com sucesso']);
    }
}
