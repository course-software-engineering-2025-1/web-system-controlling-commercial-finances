<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Bill;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class BillControllerTest extends TestCase
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
    public function a_user_can_create_and_view_bills()
    {
        // Criação de conta a pagar
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/bills', [
                             'name' => 'Conta de Luz',
                             'amount' => 150.00,
                             'due_date' => now()->addDays(30),
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'Conta de Luz']);

        // Listagem de contas a pagar
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/bills');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['name' => 'Conta de Luz']);
    }
}
