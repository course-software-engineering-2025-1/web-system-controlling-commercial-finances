<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(){
        return response()->json((['relatorio' => 'Aqui está seu relatório!']));
    }
}
