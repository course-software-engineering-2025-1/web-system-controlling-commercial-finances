<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $fillable = [
        'user_id', // ID do usuário que é o comerciante dono do cliente
        'nome',
        'cpf_cnpj',
        'telefone',
        'endereco',
        'nascimento',
        'historico_compras',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
