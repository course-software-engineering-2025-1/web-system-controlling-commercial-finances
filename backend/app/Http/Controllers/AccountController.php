<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class AccountController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $accounts = Account::where('user_id', $user->id)->get()->map(function ($account) {
            $account->balance = $account->transactions()->sum('amount');
            return $account;
        });

        return response()->json($accounts);
    }


    // funcao para criar a conta
    public function store(Request $request)
    {
        $request->validate([
            'account_type' => 'required|in:Conta Corrente,Poupança,Cartão de Crédito',
            'name' => 'required|string|max:255',
            'initial_balance' => 'nullable|numeric',
        ]);

        $account = Account::create([
            'user_id' => $request->user()->id,
            'account_type' => $request->account_type,
            'name' => $request->name,
        ]);

        // Se valor inicial for informado, cria uma transação de entrada
        if ($request->filled('initial_balance') && $request->initial_balance != 0) {
            $account->transactions()->create([
                'user_id' => $request->user()->id,
                'account_id' => $account->id,
                'amount' => $request->initial_balance,
                'description' => 'Saldo inicial',
                'date' => now(),
                'category' => 'Outros',
                'subcategory' => null,
                'location' => null,
                'is_recurring' => false,
                'type' => $request->initial_balance < 0 ? 'expense' : 'income',
            ]);
        }

    return response()->json($account->load('transactions'), 201);
}


    public function showBalance($id, Request $request)
{
    $account = Account::findOrFail($id);

    if ($account->user_id !== $request->user()->id) {
        return response()->json(['error' => 'Acesso não autorizado.'], 403);
    }

    $balance = $account->transactions()->sum('amount');

    return response()->json([
        'account_id' => $account->id,
        'account_name' => $account->name,
        'balance' => $balance
    ]);
}


}
