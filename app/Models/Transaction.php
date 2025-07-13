<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'account_id',
        'amount',
        'category',
        'subcategory',
        'description',
        'date',
        'location',
        'is_recurring',
        'type',
    ];

    protected $casts = [
        'is_recurring' => 'boolean',
        'amount' => 'float',
        'date' => 'date'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function account()
    {
        return $this->belongsTo(Account::class);
    }

    public function getAccountIdAttribute()
    {
        return $this->attributes['account_id'] ?? null;
    }

    public function getIsRecurringAttribute()
    {
        return $this->attributes['is_recurring'] ?? null;
    }

} 