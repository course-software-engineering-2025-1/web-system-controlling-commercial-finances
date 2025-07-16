<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Budget;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BudgetControllerTest extends TestCase
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
    public function a_user_can_create_and_view_budgets()
    {
        // Criação de orçamento
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/budgets', [
                             'name' => 'Orçamento de Alimentação',
                             'amount' => 500.00,
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'Orçamento de Alimentação']);

        // Listagem de orçamentos
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/budgets');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['name' => 'Orçamento de Alimentação']);
    }
}
