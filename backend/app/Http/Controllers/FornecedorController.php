<?php

namespace App\Http\Controllers;

use App\Models\Fornecedor;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FornecedorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $request->validate([
            'nome' => 'required|string',
            'cnpj' => [
                'required',
                'string',
                Rule::unique('fornecedores')->where(function ($query) {
                    return $query->where('user_id', Auth::id());
                }),
            ],
            'contato' => 'required|string'
        ]);

        $fornecedor = Fornecedor::create([
            'user_id' => (Auth::user())->id,
            'nome' => $request->nome,
            'cnpj' => $request->cnpj,
            'contato' => $request->contato
        ]);

        return response()->json($fornecedor, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fornecedor $fornecedor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Fornecedor $fornecedor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Fornecedor $fornecedor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fornecedor $fornecedor)
    {
        //
    }
}
