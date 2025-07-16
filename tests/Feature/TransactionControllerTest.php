<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Account;
use App\Models\Transaction;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TransactionControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;
    protected $account;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->token = JWTAuth::fromUser ($this->user);
        $this->account = Account::create([
            'user_id' => $this->user->id,
            'account_type' => 'Conta Corrente',
            'name' => 'Minha Conta Teste',
        ]);
    }

    /** @test */
    public function a_user_can_create_and_view_transactions()
    {
        // Criação de transação
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/transactions', [
                             'accountId' => $this->account->id,
                             'amount' => 100.00,
                             'category' => 'Salário',
                             'description' => 'Pagamento mensal',
                             'date' => now(),
                             'isRecurring' => false,
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['description' => 'Pagamento mensal']);

        // Listagem de transações
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/transactions');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['description' => 'Pagamento mensal']);
    }
}
