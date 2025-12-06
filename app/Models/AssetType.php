<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetType extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'description',
        'icon',
        'category',
        'requires_approval',
        'is_active',
        'sort_order',
        'settings',
    ];

    protected $casts = [
        'requires_approval' => 'boolean',
        'is_active' => 'boolean',
        'settings' => 'array',
    ];

    public function userAssets()
    {
        return $this->hasMany(UserAsset::class);
    }

    public function assetTransactions()
    {
        return $this->hasMany(AssetTransaction::class);
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeCashEquivalent($query)
    {
        return $query->where('category', 'cash_equivalent');
    }

    public function scopePoint($query)
    {
        return $query->where('category', 'point');
    }
}
