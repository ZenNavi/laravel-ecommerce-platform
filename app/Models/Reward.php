<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reward extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'points_required',
        'type',
        'value',
        'product_id',
        'voucher_code',
        'quantity',
        'redeemed_count',
        'is_active',
        'valid_from',
        'valid_until',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'is_active' => 'boolean',
        'valid_from' => 'date',
        'valid_until' => 'date',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function redemptions()
    {
        return $this->hasMany(RewardRedemption::class);
    }
}
