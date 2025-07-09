<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{

    protected $table = 'fornecedores';

    protected $fillable = [
        'user_id', // ID do usuário que é o comerciante dono do fornecedor
        'nome',
        'cnpj',
        'contato'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
