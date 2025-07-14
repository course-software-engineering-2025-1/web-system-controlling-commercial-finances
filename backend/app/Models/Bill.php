<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'amount',
        'due_date',
        'paid',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
