<?php

namespace App\Http\Controllers;

use App\Models\Investment;
use Illuminate\Http\Request;

class InvestmentController extends Controller
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
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'initial_value' => 'required|numeric',
            'current_value' => 'required|numeric',
        ]);

        $investment = Investment::create([
            'user_id' => $request->user()->id,
            'name' => $validated['name'],
            'initial_value' => $validated['initial_value'],
            'current_value' => $validated['current_value'],
        ]);

        return response()->json($investment, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Investment $investment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Investment $investment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Investment $investment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Investment $investment)
    {
        //
    }

    public function summary(Request $request)
    {
        $userId = $request->user()->id;

        $investments = Investment::where('user_id', $userId)->get();

        $totalInitialValue = $investments->sum('initial_value');
        $totalCurrentValue = $investments->sum('current_value');

        $gainLossPercent = $totalInitialValue > 0
            ? round((($totalCurrentValue - $totalInitialValue) / $totalInitialValue) * 100, 2)
            : 0;

        return response()->json([
            'total_current_value' => $totalCurrentValue,
            'gain_loss_percent' => $gainLossPercent
        ]);
    }
}
