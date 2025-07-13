<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Account extends Model
{


    protected $fillable = [
        'user_id',
        'account_type',
        'name'    // ou 'descricao', conforme o nome do campo na sua migration
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
