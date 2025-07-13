<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;
use App\Models\Account;
use App\Models\Transfer;

class TransferController extends Controller
{
    public function ping()
    {
        return response()->json(['controller' => 'ok']);
    }

    public function transferir(Request $request)
    {
        $data = $request->validate([
            'conta_origem' => 'required|exists:accounts,id',
            'conta_destino' => 'required|exists:accounts,id|different:conta_origem',
            'valor' => 'required|numeric|min:0.01',
        ]);

        DB::transaction(function () use ($data) {
            $origem = Account::find($data['conta_origem']);
            $destino = Account::find($data['conta_destino']);

            if ($origem->saldo < $data['valor']) {
                throw new \Exception('Saldo insuficiente');
            }

            $origem->saldo -= $data['valor'];
            $origem->save();

            $destino->saldo += $data['valor'];
            $destino->save();

            Transfer::create([
                'conta_origem' => $origem->id,
                'conta_destino' => $destino->id,
                'valor_criptografado' => Crypt::encryptString($data['valor']),
                'data' => now(),
            ]);
        });

        return response()->json(['mensagem' => 'Transferência realizada com sucesso']);
    }
}

