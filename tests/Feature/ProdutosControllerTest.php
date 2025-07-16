<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Produtos;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProdutosControllerTest extends TestCase
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
    public function a_user_can_create_and_view_products()
    {
        // Criação de produto
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->postJson('/api/produtos', [
                             'nome' => 'Produto Teste',
                             'sku' => 'SKU123',
                             'preco' => 99.99,
                             'estoque' => 10,
                             'categoria' => 'Categoria Teste',
                         ]);

        $response->assertStatus(201)
                 ->assertJson(['nome' => 'Produto Teste']);

        // Listagem de produtos
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/produtos');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['nome' => 'Produto Teste']);
    }
}
