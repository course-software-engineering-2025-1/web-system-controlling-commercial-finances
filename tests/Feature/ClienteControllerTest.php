<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Cliente;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClienteControllerTest extends TestCase
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
    public function a_user_can_create_and_view_clientes()
    {
        // Criação de cliente
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/clientes', [
                             'nome' => 'Cliente Teste',
                             'cpf_cnpj' => '12345678901',
                             'telefone' => '123456789',
                             'endereco' => 'Rua Teste, 123',
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['nome' => 'Cliente Teste']);

        // Listagem de clientes
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/clientes');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['nome' => 'Cliente Teste']);
    }
}
