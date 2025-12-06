<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserAsset extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'asset_type_id',
        'balance',
        'pending_balance',
        'is_active',
        'last_transaction_at',
    ];

    protected $casts = [
        'balance' => 'decimal:2',
        'pending_balance' => 'decimal:2',
        'is_active' => 'boolean',
        'last_transaction_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assetType()
    {
        return $this->belongsTo(AssetType::class);
    }

    public function transactions()
    {
        return $this->hasMany(AssetTransaction::class);
    }

    public function getTotalBalanceAttribute()
    {
        return $this->balance + $this->pending_balance;
    }

    public function hasBalance($amount)
    {
        return $this->balance >= $amount;
    }
}
