<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;


// controle de transacao, conta(Cartao de credito, Debito, Poupanca), valor(se for negativo é despesa), categoria(alimentacao, transporte, saude, salario e outros), subcategoria, descrição, data, Localizacao(opcional), e select se a transacao é recorrente ou não
class TransactionController extends Controller
{
   // Função para criar uma nova transação
   public function store(Request $request)
   {
       $validated = $request->validate([
           'accountId' => 'required|integer|in:1,2,3',
           'amount' => 'required|numeric',
           'category' => 'required|string|max:255',
           'subcategory' => 'nullable|string|max:255',
           'description' => 'required|string|max:255',
           'date' => 'required|date',
           'location' => 'nullable|string|max:255',
           'isRecurring' => 'required|boolean',
       ]);

         $transaction = Transaction::create([
              'user_id' => $request->user()->id,
              'account_id' => $validated['accountId'],
              'amount' => $validated['amount'],
              'category' => $validated['category'],
              'subcategory' => $validated['subcategory'],
              'description' => $validated['description'],
              'date' => $validated['date'],
              'location' => $validated['location'],
              'is_recurring' => $validated['isRecurring'],
              'type' => $validated['amount'] < 0 ? 'expense' : 'income',
         ]);


         return response()->json([
            'id' => $transaction->id,
            'account_id' => $transaction->account_id,
            'amount' => (float)$transaction->amount,
            'category' => $transaction->category,
            'subcategory' => $transaction->subcategory,
            'description' => $transaction->description,
            'date' => $transaction->date,
            'type' => $transaction->type,
            'location' => $transaction->location,
            'is_recurring' => $transaction->is_recurring,
         ], 201);
   }

   public function index(Request $request) {

      $transactions = Transaction::where('user_id', $request->user()->id)
         ->orderBy('date', 'desc')
         ->get()
         ->map(function ($transaction) {
            return [
               'id' => $transaction->id,
               'account_id' => $transaction->account_id,
               'amount' => (float)$transaction->amount,
               'category' => $transaction->category,
               'subcategory' => $transaction->subcategory,
               'description' => $transaction->description,
               'date' => $transaction->date,
               'type' => $transaction->type,
               'location' => $transaction->location,
               'is_recurring' => $transaction->is_recurring,
            ];
         }); 
         
      return response()->json($transactions);
   }

   public function show($id)
   {
       $transaction = Transaction::where('id', $id)
         ->where('user_id', request()->user()->id)
         ->firstOrFail();
         
       return response()->json([
            'id' => $transaction->id,
            'account_id' => $transaction->account_id,
            'amount' => (float)$transaction->amount,
            'category' => $transaction->category,
            'subcategory' => $transaction->subcategory,
            'description' => $transaction->description,
            'date' => $transaction->date,
            'type' => $transaction->type,
            'location' => $transaction->location,
            'is_recurring' => $transaction->is_recurring,
         ], 201);
   }

   public function update(Request $request, $id)
   {
       $transaction = Transaction::where('id', $id)
         ->where('user_id', $request->user()->id)
         ->firstOrFail();

       $validated = $request->validate([
           'accountId' => 'sometimes|required|integer|in:1,2,3',
           'amount' => 'required|numeric',
           'category' => 'required|string|max:255',
           'subcategory' => 'nullable|string|max:255',
           'description' => 'required|string|max:255',
           'date' => 'required|date',
           'location' => 'nullable|string|max:255',
           'isRecurring' => 'required|boolean',
       ]);

       if(isset($validated['amount'])) {
           $validated['type'] = $validated['amount'] < 0 ? 'expense' : 'income';
       }

      if(isset($validated['accountId'])) {
         $validated['account_id'] = $validated['accountId'];
         unset($validated['accountId']);
      }

      if(isset($validated['isRecurring'])) {
         $validated['is_recurring'] = $validated['isRecurring'];
         unset($validated['isRecurring']);
      }

       $transaction->update($validated);

       return response()->json([
            'id' => $transaction->id,
            'account_id' => $transaction->account_id,
            'amount' => (float)$transaction->amount,
            'category' => $transaction->category,
            'subcategory' => $transaction->subcategory,
            'description' => $transaction->description,
            'date' => $transaction->date,
            'type' => $transaction->type,
            'location' => $transaction->location,
            'is_recurring' => $transaction->is_recurring,
         ], 201);
   }

   public function destroy($id)
   {
       $transaction = Transaction::where('id', $id)
           ->where('user_id', request()->user()->id)
           ->firstOrFail();
           
       $transaction->delete();

       return response()->json(['message' => 'Transacao deletada com sucesso'], 200);
   }
}
