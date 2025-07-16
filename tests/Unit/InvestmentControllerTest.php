<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Investment;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InvestmentControllerTest extends TestCase
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
    public function a_user_can_create_an_investment()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/investments', [
                             'name' => 'Investimento Teste',
                             'initial_value' => 1000.00,
                             'current_value' => 1200.00,
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'Investimento Teste']);

        $this->assertDatabaseHas('investments', [
            'name' => 'Investimento Teste',
            'initial_value' => 1000.00,
            'current_value' => 1200.00,
        ]);
    }
}
