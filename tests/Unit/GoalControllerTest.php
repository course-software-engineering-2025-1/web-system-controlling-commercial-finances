<?php

namespace Tests\Unit;

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
    public function a_user_can_create_a_goal()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/goals', [
                             'name' => 'Meta de Viagem',
                             'value' => 2000.00,
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'Meta de Viagem']);

        $this->assertDatabaseHas('goals', [
            'name' => 'Meta de Viagem',
            'value' => 2000.00,
        ]);
    }
}
