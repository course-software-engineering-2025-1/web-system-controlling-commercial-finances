<?php

namespace App\Http\Controllers;

use App\Models\Goal;
use Illuminate\Http\Request;

class GoalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goals = Goal::where('user_id', request()->user()->id)->get();

        return response()->json($goals);
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
            'name' => 'required|string|max:255',
            'value' => 'required|numeric|min:0',
        ]);

        $goal = Goal::create([
            'user_id' => request()->user()->id,
            'name' => $request->name,
            'value' => $request->value,
        ]);

        return response()->json($goal, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Goal $goal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Goal $goal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Goal $goal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goal $goal)
    {
        //
    }
}
