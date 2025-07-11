<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\FornecedorController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProdutosController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot_password', [AuthController::class, 'forgotPassword']);
Route::post('/reset_password', [AuthController::class, 'resetPassword'])->name('password.reset');

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/cadastrar-cliente', [ClienteController::class, 'store']);
    Route::get('/clentes', [ClienteController::class, 'index']);
    Route::get('/cliente/{id}', [ClienteController::class, 'show']);
    Route::put('/clientes/{id}', [ClienteController::class, 'update']);
    Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);
    Route::post('/cadastrar-fornecedor', [FornecedorController::class, 'store']);
    Route::post('/produtos', [ProdutosController::class, 'store']);
    Route::get('/produtos', [ProdutosController::class, 'index']);
    Route::get('/produtos/{produtos}', [ProdutosController::class, 'show']);
    Route::put('/produtos/{produtos}', [ProdutosController::class, 'update']);
    Route::delete('/produtos/{produtos}', [ProdutosController::class, 'destroy']);
});

Route::middleware(['auth:api', 'role:comerciante'])->group(function (){
    Route::get('/report', [ReportController::class, 'index']);
    Route::post('/register_funcionario', [AuthController::class, 'registerFuncionario']);
    Route::get('/funcionarios', [AuthController::class, 'getFuncionarios']);
    Route::get('/funcionario/{id}', [AuthController::class, 'getFuncionario']);
    Route::put('/funcionario/{id}', [AuthController::class, 'updateFuncionario']);
    Route::delete('/funcionario/{id}', [AuthController::class, 'deleteFuncionario']);
    Route::post('/registrar-receita', [TransactionController::class, 'registrarReceita']);
    Route::post('/registrar-despesa', [TransactionController::class, 'registrarDespesa']);
    Route::post('/registrar-transferencia', [TransactionController::class, 'realizarTransferencia']);
    Route::get('/accounts', [TransactionController::class, 'index']);
    Route::get('/transactions', [TransactionController::class, 'index']);
});