<?php

namespace Tests\Unit;

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
    public function a_user_can_create_a_transaction()
    {
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
                 ->assertJson(['amount' => 100.00]);

        $this->assertDatabaseHas('transactions', [
            'user_id' => $this->user->id,
            'amount' => 100.00,
            'description' => 'Pagamento mensal',
        ]);
    }

    /** @test */
    public function a_user_can_view_their_transactions()
    {
        Transaction::create([
            'user_id' => $this->user->id,
            'account_id' => $this->account->id,
            'amount' => 100.00,
            'category' => 'Salário',
            'description' => 'Pagamento mensal',
            'date' => now(),
            'type' => 'income',
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/transactions');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['description' => 'Pagamento mensal']);
    }
}
