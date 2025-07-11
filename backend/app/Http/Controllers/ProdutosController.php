<?php

namespace App\Http\Controllers;

use App\Models\Produtos;
use Illuminate\Http\Request;

class ProdutosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produtos = Produtos::all();
        return response()->json($produtos);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'sku' => 'required|string',
            'preco' => 'required|numeric',
            'estoque' => 'required|integer',
            'categoria' => 'required|string|max:255',
        ]);

        $produto = Produtos::create($validated);

        return response()->json($produto, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Produtos $produtos)
    {
        return response()->json($produtos);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produtos $produtos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produtos $produtos)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'sku' => 'required|string',
            'preco' => 'required|numeric',
            'estoque' => 'required|integer',
            'categoria' => 'required|string|max:255',
        ]);

        $produtos->update($validated);

        return response()->json($produtos);
    }

    /**
     * Remove the specified resource from storage. de acordo com o id do produto correspondente
     */
    public function destroy(Produtos $produtos)
    {
        $produtos->delete();
        return response()->json(null, 204);
    }
}
