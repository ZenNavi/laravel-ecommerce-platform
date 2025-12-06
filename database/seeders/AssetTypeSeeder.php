<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssetTypeSeeder extends Seeder
{
    public function run(): void
    {
        $assetTypes = [
            [
                'code' => 'cash',
                'name' => 'Cash',
                'description' => 'Physical cash or bank account balance',
                'icon' => 'money-bill',
                'category' => 'cash_equivalent',
                'requires_approval' => false,
                'is_active' => true,
                'sort_order' => 1,
                'settings' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'card',
                'name' => 'Credit/Debit Card',
                'description' => 'Credit or debit card payment',
                'icon' => 'credit-card',
                'category' => 'cash_equivalent',
                'requires_approval' => false,
                'is_active' => true,
                'sort_order' => 2,
                'settings' => json_encode([]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'pay',
                'name' => 'Pay',
                'description' => 'Internal pay system with charge request/approval',
                'icon' => 'wallet',
                'category' => 'cash_equivalent',
                'requires_approval' => true,
                'is_active' => true,
                'sort_order' => 3,
                'settings' => json_encode([
                    'min_charge_amount' => 1000,
                    'max_charge_amount' => 1000000,
                    'allow_auto_approval' => false,
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'code' => 'reward_point',
                'name' => 'Reward Points',
                'description' => 'Reward points earned from purchases and activities',
                'icon' => 'star',
                'category' => 'point',
                'requires_approval' => false,
                'is_active' => true,
                'sort_order' => 4,
                'settings' => json_encode([
                    'points_to_currency_ratio' => 0.01,
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('asset_types')->insert($assetTypes);
    }
}
