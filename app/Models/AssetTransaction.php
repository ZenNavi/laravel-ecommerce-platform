<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'asset_type_id',
        'user_asset_id',
        'amount',
        'type',
        'transaction_type',
        'source',
        'sourceable_id',
        'sourceable_type',
        'description',
        'balance_before',
        'balance_after',
        'status',
        'completed_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'balance_before' => 'decimal:2',
        'balance_after' => 'decimal:2',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assetType()
    {
        return $this->belongsTo(AssetType::class);
    }

    public function userAsset()
    {
        return $this->belongsTo(UserAsset::class);
    }

    public function sourceable()
    {
        return $this->morphTo();
    }

    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
