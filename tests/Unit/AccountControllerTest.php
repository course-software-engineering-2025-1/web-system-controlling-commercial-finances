<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Account;
use App\Models\Transaction;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AccountControllerTest extends TestCase
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
    public function a_user_can_create_an_account()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/accounts', [
                             'account_type' => 'Conta Corrente',
                             'name' => 'Minha Conta Teste',
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['name' => 'Minha Conta Teste']);

        $this->assertDatabaseHas('accounts', [
            'user_id' => $this->user->id,
            'name' => 'Minha Conta Teste',
        ]);
    }

    /** @test */
    public function a_user_can_view_their_accounts()
    {
        Account::create([
            'user_id' => $this->user->id,
            'account_type' => 'Conta Corrente',
            'name' => 'Conta Principal',
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/accounts');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['name' => 'Conta Principal']);
    }

    /** @test */
    public function a_user_can_view_account_balance()
    {
        $account = Account::create([
            'user_id' => $this->user->id,
            'account_type' => 'Conta Corrente',
            'name' => 'Conta Principal',
        ]);

        Transaction::create([
            'user_id' => $this->user->id,
            'account_id' => $account->id,
            'amount' => 100.00,
            'description' => 'Depósito',
            'date' => now(),
            'type' => 'income',
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/accounts/' . $account->id . '/balance');

        $response->assertStatus(200)
                 ->assertJson(['balance' => 100.00]);
    }
}
