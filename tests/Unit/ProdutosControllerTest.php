<?php

namespace Tests\Unit;

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
    public function a_user_can_create_a_product()
    {
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

        $this->assertDatabaseHas('produtos', [
            'nome' => 'Produto Teste',
            'sku' => 'SKU123',
        ]);
    }

    /** @test */
    public function a_user_can_view_their_products()
    {
        Produtos::create([
            'nome' => 'Produto Teste',
            'sku' => 'SKU123',
            'preco' => 99.99,
            'estoque' => 10,
            'categoria' => 'Categoria Teste',
            'comerciante_id' => $this->user->id,
        ]);

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $this->token])
                         ->getJson('/api/produtos');

        $response->assertStatus(200)
                 ->assertJsonCount(1)
                 ->assertJsonFragment(['nome' => 'Produto Teste']);
    }
}
