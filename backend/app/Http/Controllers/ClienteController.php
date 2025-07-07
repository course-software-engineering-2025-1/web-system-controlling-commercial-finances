<?php

namespace App\Http\Controllers;

use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClienteController extends Controller
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
            'cpf_cnpj' =>  'required|string|unique:clientes',
            'telefone' => 'nullable|string',
            'endereco' => 'nullable|string',
            'nascimento' => 'nullable|date',
            'historico_compras' => 'nullable|string',
        ]);

        $cliente = Cliente::create([
            'user_id' => (Auth::user())->id,
            'nome' => $request->nome,
            'cpf_cnpj' => $request->cpf_cnpj,
            'telefone' => $request->telefone,
            'endereco' => $request->endereco,
            'nascimento' => $request->nascimento,
            'historico_compras' => $request->historico_compras,

        ]);

        return response()->json($cliente, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Cliente $cliente)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cliente $cliente)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Cliente $cliente)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cliente $cliente)
    {
        //
    }
}
