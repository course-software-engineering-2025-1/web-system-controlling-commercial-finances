<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $budgets = Budget::all();
        return response()->json($budgets);
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
     * 
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'spent' => 'nullable|numeric|min:0',
        ]);

        $budget = Budget::create($request->all());

        return response()->json($budget, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Budget $budget)
    {
        return response()->json($budget);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Budget $budget)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Budget $budget)
    {
        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'amount' => 'sometimes|required|numeric|min:0',
            'spent' => 'sometimes|nullable|numeric|min:0',
        ]);

        $budget->update($request->all());

        return response()->json($budget);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Budget $budget)
    {
        $budget->delete();
        return response()->json(null, 204);
    }
}
