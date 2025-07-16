<?php

namespace Tests\Unit;

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
    public function a_user_can_create_a_notification()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/notifications', [
                             'title' => 'Notificação Teste',
                             'message' => 'Esta é uma mensagem de teste.',
                             'date' => now(),
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['title' => 'Notificação Teste']);

        $this->assertDatabaseHas('notifications', [
            'title' => 'Notificação Teste',
            'message' => 'Esta é uma mensagem de teste.',
        ]);
    }
}
