<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'initial_value',
        'current_value',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
