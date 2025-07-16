<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Fornecedor;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FornecedorControllerTest extends TestCase
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
    public function a_user_can_create_a_fornecedor()
    {
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/fornecedores', [
                             'nome' => 'Fornecedor Teste',
                             'cnpj' => '12345678000195',
                             'contato' => 'contato@fornecedor.com',
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['nome' => 'Fornecedor Teste']);

        $this->assertDatabaseHas('fornecedores', [
            'nome' => 'Fornecedor Teste',
            'cnpj' => '12345678000195',
        ]);
    }
}
