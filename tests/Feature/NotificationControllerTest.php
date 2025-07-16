<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Notification;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NotificationControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser ($this->user);
    }

    /** @test */
    public function a_user_can_create_and_view_notifications()
    {
        // Criação de notificação
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/notifications', [
                             'title' => 'Notificação Teste',
                             'message' => 'Esta é uma mensagem de teste.',
                             'date' => now(),
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['title' => 'Notificação Teste']);

        // Listagem de notificações
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/notifications');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['title' => 'Notificação Teste']);
    }
}
