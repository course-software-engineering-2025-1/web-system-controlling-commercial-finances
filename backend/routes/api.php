<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReportController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot_password', [AuthController::class, 'forgotPassword']);
Route::post('/reset_password', [AuthController::class, 'resetPassword'])->name('password.reset');

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:api', 'role:comerciante'])->group(function (){
    Route::get('/report', [ReportController::class, 'index']);
});