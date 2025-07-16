<?php

namespace Tests\Unit;

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
    public function a_user_can_create_a_budget()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/budgets', [
                             'name' => 'Orçamento de Alimentação',
                             'amount' => 500.00,
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'Orçamento de Alimentação']);

        $this->assertDatabaseHas('budgets', [
            'name' => 'Orçamento de Alimentação',
            'amount' => 500.00,
        ]);
    }
}
