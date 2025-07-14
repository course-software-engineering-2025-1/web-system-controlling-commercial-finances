<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class InsightsController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $monthlySpending = Transaction::where('user_id', $userId)
            ->where('type', 'expense')
            ->whereMonth('date', now()->month)
            ->sum('amount');

        $monthlySpending = abs($monthlySpending); // Ensure positive value

        $topCategories = Transaction::select('category', DB::raw('ABS(SUM(amount)) as amount'))
            ->where('user_id', $userId)
            ->where('type', 'expense')
            ->whereMonth('date', now()->month)
            ->groupBy('category')
            ->orderBy('amount')
            ->limit(5)
            ->get();

        $recommendations = "Mantenha seus gastos sob controle e considere investir seu saldo disponivel.";

        return response()->json([
            'monthly_spending' => $monthlySpending,
            'top_categories' => $topCategories,
            'recommendations' => $recommendations,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
        ]);

        $transaction = Transaction::create([
            'user_id' => $request->user()->id,
            'amount' => $request->amount,
            'description' => $request->description,
            'category' => $request->category,
            'date' => $request->date,
            'type' => $request->type,
        ]);

        return response()->json($transaction, 201);
    }
    
}
