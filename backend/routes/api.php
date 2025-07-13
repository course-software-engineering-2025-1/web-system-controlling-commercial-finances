<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\FornecedorController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProdutosController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\InsightsController;
use App\Http\Controllers\InvestmentController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\GoalController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/forgot_password', [AuthController::class, 'forgotPassword']);
Route::post('/reset_password', [AuthController::class, 'resetPassword'])->name('password.reset');

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/profile', [AuthController::class, 'update']);

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

    Route::get('/accounts', [AccountController::class, 'index']);
    Route::post('/accounts', [AccountController::class, 'store']);
    Route::get('/accounts/{id}/balance', [AccountController::class, 'showBalance']);

    Route::post('/transactions', [TransactionController::class, 'store']);
    Route::put('/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/transactions/{id}', [TransactionController::class, 'destroy']);
    Route::get('/transactions/{id}', [TransactionController::class, 'show']);
    Route::get('/transactions', [TransactionController::class, 'index']);

    Route::get('/budgets', [BudgetController::class, 'index']);
    Route::post('/budgets', [BudgetController::class, 'store']);
    Route::get('/budgets/{budget}', [BudgetController::class, 'show']);
    Route::put('/budgets/{budget}', [BudgetController::class, 'update']);
    Route::delete('/budgets/{budget}', [BudgetController::class, 'destroy']);

    Route::get('/insights', [InsightsController::class, 'index']);

    Route::get('/investments-summary', [InvestmentController::class, 'summary']);
    Route::post('/investments', [InvestmentController::class, 'store']);

    Route::get('/bills-due', [BillController::class, 'due']);

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::patch('/notifications/mark-all', [NotificationController::class, 'markAllAsRead']);
    Route::patch('/notifications/{id}/toggle-read', [NotificationController::class, 'toggleRead']);
    Route::post('/notifications', [NotificationController::class, 'store']);

    Route::post('/goals', [GoalController::class, 'store']);
    Route::get('/goals', [GoalController::class, 'index']);
});