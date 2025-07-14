<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(){
        return response()->json((['relatorio' => 'Aqui está seu relatório!']));
    }

    public function show($tipo, Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['error' => 'Usuário não autenticado.'], 401);
        }

        switch ($tipo) {
            case 'cashflow':
                // Somar receita e despesa por mês
                $results = Transaction::select(
                        DB::raw("DATE_FORMAT(date, '%Y-%m') as month"),
                        DB::raw("SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income"),
                        DB::raw("SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense")
                    )
                    ->where('user_id', $user->id)
                    ->groupBy('month')
                    ->orderBy('month')
                    ->get();

                $labels = $results->pluck('month');
                $income = $results->pluck('income');
                $expense = $results->pluck('expense');

                $data = [
                    'labels' => $labels,
                    'income' => $income,
                    'expense' => $expense,
                ];
                break;

            case 'expensesByCategory':
                $results = Transaction::select('category', DB::raw('SUM(amount) as total'))
                    ->where('user_id', $user->id)
                    ->where('type', 'expense')
                    ->groupBy('category')
                    ->get();

                $data = [
                    'labels' => $results->pluck('category'),
                    'data' => $results->pluck('total'),
                ];
                break;

            case 'budgetReport':
                $budgets = DB::table('budgets')
                    ->select('name', 'amount', 'spent')
                    ->where('user_id', $user->id)
                    ->get();

                $data = [
                    'labels' => $budgets->pluck('name'),  
                    'budget' => $budgets->pluck('amount'),
                    'spent' => $budgets->pluck('spent'),
                ];
            break;


            default:
                return response()->json(['error' => 'Tipo de relatório inválido.'], 400);
        }

        return response()->json($data);
    }

    public function export($tipo, Request $request)
{
    $user = $request->user();

    if (!$user) {
        return response()->json(['error' => 'Não autenticado'], 401);
    }

    $csv = '';
    $filename = '';

    switch ($tipo) {
        case 'cashflow':
            $results = Transaction::select(
                    DB::raw("DATE_FORMAT(date, '%Y-%m') as month"),
                    DB::raw("SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income"),
                    DB::raw("SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense")
                )
                ->where('user_id', $user->id)
                ->groupBy('month')
                ->orderBy('month')
                ->get();

            $csv = "Mês,Receita,Despesa\n";
            foreach ($results as $r) {
                $csv .= "{$r->month},{$r->income}," . abs($r->expense) . "\n";
            }

            $filename = "relatorio_fluxo_caixa.csv";
            break;

        case 'expensesByCategory':
            $results = Transaction::select('category', DB::raw('SUM(amount) as total'))
                ->where('user_id', $user->id)
                ->where('type', 'expense')
                ->groupBy('category')
                ->get();

            $csv = "Categoria,Total\n";
            foreach ($results as $r) {
                $csv .= "{$r->category},{$r->total}\n";
            }

            $filename = "relatorio_despesas_categoria.csv";
            break;

        case 'budgetReport':
            $results = DB::table('budgets')
                ->select('name', 'amount', 'spent')
                ->where('user_id', $user->id)
                ->get();

            $csv = "Mês,Orçamento,Gasto,Status\n";
            foreach ($results as $r) {
                $status = $r->spent <= $r->amount ? 'Dentro' : 'Ultrapassado';
                $csv .= "{$r->name},{$r->amount},{$r->spent},{$status}\n";
            }

            $filename = "relatorio_orcamento.csv";
            break;

        default:
            return response()->json(['error' => 'Tipo inválido'], 400);
    }

    return response($csv)
        ->header('Content-Type', 'text/csv')
        ->header('Content-Disposition', "attachment; filename=\"$filename\"");
}


}
