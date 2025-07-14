<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use App\Models\Bill;
use Carbon\Carbon;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $notifications = Notification::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->get();

        return response()->json($notifications);
    }

    public function markAllAsRead(Request $request)
    {
        $user = $request->user();
        Notification::where('user_id', $user->id)
            ->update(['read' => true]);

        return response()->json(['message' => 'Todas as notificações foram marcadas como lidas.']);
    }

    public function toggleRead($id)
    {
        $notification = Notification::findOrFail($id);
        $notification->read = !$notification->read;
        $notification->save();

        return response()->json(['message' => 'Notificação atualizada com sucesso.', 'read' => $notification->read]);
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
            'title' => 'required|string|max:255',
            'message' => 'required|string',
            'date' => 'required|date',
            'read' => 'boolean',
        ]);

        $notification = Notification::create([
            'user_id' => $request->user()->id,
            'title' => $validated['title'],
            'message' => $validated['message'],
            'date' => $validated['date'],
            'read' => $validated['read'] ?? false,
        ]);

        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        //
    }

    public function checkAndGenerateNotifications(Request $request)
    {
        $user = $request->user();
        $today = Carbon::today();
        $inThreeDays = Carbon::today()->addDays(3);

        $bills = Bill::where('user_id', $user->id)
            ->where('paid', false)
            ->whereBetween('due_date', [$today, $inThreeDays])
            ->get();

        foreach ($bills as $bill) {
            $alreadyExists = Notification::where('user_id', $user->id)
                ->where('message', 'like', '%' . $bill->name . '%')
                ->whereDate('date', $today)
                ->exists();

            if (!$alreadyExists) {
                Notification::create([
                    'user_id' => $user->id,
                    'message' => "Sua conta de {$bill->name} vence em " . Carbon::parse($bill->due_date)->format('d/m/Y'),
                    'date' => Carbon::now(),
                    'read' => false,
                ]);
            }
        }

        return response()->json(['message' => 'Notificações verificadas e geradas.']);
    }
}
