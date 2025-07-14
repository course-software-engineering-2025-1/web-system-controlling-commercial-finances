<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = [
        'nome'
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'categoria_id');
    }
}
