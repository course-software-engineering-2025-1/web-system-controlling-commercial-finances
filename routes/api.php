<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransferController;
use App\Http\Controllers\TransactionController;

Route::middleware('api')->group(function () {
    // Transferência entre contas
    Route::post('/transferencias', [TransferController::class, 'transferir']);

    // Novos endpoints de movimentações financeiras
    Route::post('/despesas', [TransactionController::class, 'registrarDespesa']);
    Route::post('/receitas', [TransactionController::class, 'registrarReceita']);
    Route::post('/movimentacoes', [TransactionController::class, 'realizarTransferencia']);
});

Route::get('/ping', function () {
    return response()->json(['pong' => true]);
});

