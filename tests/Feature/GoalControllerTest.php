<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Goal;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GoalControllerTest extends TestCase
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
    public function a_user_can_create_and_view_goals()
    {
        // Criação de meta
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/goals', [
                             'name' => 'Meta de Viagem',
                             'value' => 2000.00,
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'Meta de Viagem']);

        // Listagem de metas
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/goals');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['name' => 'Meta de Viagem']);
    }
}
