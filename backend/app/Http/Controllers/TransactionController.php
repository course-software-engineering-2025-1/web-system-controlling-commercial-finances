<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function registrarReceita(Request $request)
    {
        $data = $request->validate([
            'conta_id' => 'required|exists:accounts,id',
            'categoria_id' => 'nullable|exists:categories,id',
            'valor' => 'required|numeric|min:0.01',
            'descricao' => 'nullable|string',
            'data' => 'required|date',
        ]);

        DB::transaction(function () use ($data) {
            $conta = Account::findOrFail($data['conta_id']);
            $conta->saldo += $data['valor'];
            $conta->save();

            Transaction::create([
                'conta_id' => $conta->id,
                'categoria_id' => $data['categoria_id'] ?? null,
                'tipo' => 'receita',
                'valor' => $data['valor'],
                'descricao' => $data['descricao'],
                'data' => $data['data'],
            ]);
        });

        return response()->json(['mensagem' => 'Receita registrada com sucesso']);
    }

    public function registrarDespesa(Request $request)
    {
        $data = $request->validate([
            'conta_id' => 'required|exists:accounts,id',
            'categoria_id' => 'nullable|exists:categories,id',
            'valor' => 'required|numeric|min:0.01',
            'descricao' => 'nullable|string',
            'data' => 'required|date',
        ]);

        DB::transaction(function () use ($data) {
            $conta = Account::findOrFail($data['conta_id']);

            if ($conta->saldo < $data['valor']) {
                throw new \Exception('Saldo insuficiente para despesa');
            }

            $conta->saldo -= $data['valor'];
            $conta->save();

            Transaction::create([
                'conta_id' => $conta->id,
                'categoria_id' => $data['categoria_id'] ?? null,
                'tipo' => 'despesa',
                'valor' => $data['valor'],
                'descricao' => $data['descricao'],
                'data' => $data['data'],
            ]);
        });

        return response()->json(['mensagem' => 'Despesa registrada com sucesso']);
    }

    public function realizarTransferencia(Request $request)
    {
        $data = $request->validate([
            'conta_id' => 'required|exists:accounts,id',
            'conta_destino_id' => 'required|exists:accounts,id|different:conta_id',
            'valor' => 'required|numeric|min:0.01',
            'descricao' => 'nullable|string',
            'data' => 'required|date',
        ]);

        DB::transaction(function () use ($data) {
            $origem = Account::findOrFail($data['conta_id']);
            $destino = Account::findOrFail($data['conta_destino_id']);

            if ($origem->saldo < $data['valor']) {
                throw new \Exception('Saldo insuficiente para transferência');
            }

            $origem->saldo -= $data['valor'];
            $origem->save();

            $destino->saldo += $data['valor'];
            $destino->save();

            Transaction::create([
                'conta_id' => $origem->id,
                'conta_destino_id' => $destino->id,
                'tipo' => 'transferencia',
                'valor' => $data['valor'],
                'descricao' => $data['descricao'],
                'data' => $data['data'],
            ]);
        });

        return response()->json(['mensagem' => 'Transferência registrada com sucesso']);
    }

    public function index(Request $request)
    {
        $transactions = Transaction::with('categoria')->get();

        return response()->json($transactions);
    }
}

