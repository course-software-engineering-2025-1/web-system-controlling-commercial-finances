<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produtos extends Model
{
    protected $fillable = [
        'nome',
        'sku',
        'preco',
        'estoque',
        'categoria',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'preco' => 'decimal:2',
        'estoque' => 'integer',
    ];
}
