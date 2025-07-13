<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransferController;

Route::post('/transferencias', [TransferController::class, 'transferir'])->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);

