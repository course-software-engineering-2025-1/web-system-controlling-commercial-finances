<?php

namespace App\Http\Controllers;

use App\Models\Produtos;
use Illuminate\Http\Request;

class ProdutosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        // Retorna só produtos do comerciante logado
        $produtos = Produtos::where('comerciante_id', $user->id)->get();
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

        $user = $request->user();

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'sku' => 'required|string',
            'preco' => 'required|numeric',
            'estoque' => 'required|integer',
            'categoria' => 'required|string|max:255',
        ]);

        $validated['comerciante_id'] = $user->id;

        $produto = Produtos::create($validated);


        return response()->json($produto, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id, Request $request)
    {
        $user = $request->user();

        $produto = Produtos::where('id', $id)->where('comerciante_id', $user->id)->first();

        if (!$produto) {
            return response()->json(['message' => 'Produto não encontrado'], 404);
        }

        return response()->json($produto);
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
    public function update(Request $request, $id)
    {

        $user = $request->user();

        $produto = Produtos::where('id', $id)
            ->where('comerciante_id', $user->id)
            ->first();

        if (!$produto) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'sku' => 'required|string',
            'preco' => 'required|numeric',
            'estoque' => 'required|integer',
            'categoria' => 'required|string|max:255',
        ]);

        $produto->update($validated);

        return response()->json($produto);
    }

    /**
     * Remove the specified resource from storage. de acordo com o id do produto correspondente
     */
    public function destroy($id, Request $request)
    {
        $user = $request->user();

        $produto = Produtos::where('id', $id)
            ->where('comerciante_id', $user->id)
            ->first();

        if (!$produto) {
            return response()->json(['error' => 'Produto não encontrado'], 404);
        }

        $produto->delete();

        return response()->json(null, 204);
    }
}