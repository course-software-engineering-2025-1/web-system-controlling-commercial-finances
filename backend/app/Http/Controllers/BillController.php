<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use Illuminate\Http\Request;
use Carbon\Carbon;

class BillController extends Controller
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
            'amount' => 'required|numeric|min:0',
            'due_date' => 'required|date',
        ]);

        $bill = Bill::create(array_merge($validated, ['user_id' => $request->user()->id]));

        return response()->json($bill, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bill $bill)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        //
    }

    public function due(Request $request)
    {
        $today = Carbon::today();
        $nextWeek = Carbon::today()->addDays(7);

        $bills = Bill::where('user_id', $request->user()->id)
            ->where('paid', false)
            ->whereBetween('due_date', [$today, $nextWeek])
            ->get()
            ->map(function ($bill) {
                return [
                    'id' => $bill->id,
                    'name' => $bill->name,
                    'amount' => $bill->amount,
                    'dueDate' => Carbon::parse($bill->due_date)->toDateString(), // ISO 8601 (YYYY-MM-DD)
                ];
            });


        return response()->json($bills);
    }
}
