<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Asset Management Configuration
    |--------------------------------------------------------------------------
    */

    'default_currency' => env('ASSET_CURRENCY', 'USD'),

    'pay' => [
        'min_charge_amount' => env('PAY_MIN_CHARGE_AMOUNT', 1000),
        'max_charge_amount' => env('PAY_MAX_CHARGE_AMOUNT', 1000000),
        'allow_auto_approval' => env('PAY_AUTO_APPROVAL', false),
        'auto_approval_limit' => env('PAY_AUTO_APPROVAL_LIMIT', 10000),
    ],

    'asset_types' => [
        'cash' => [
            'icon' => 'money-bill',
            'color' => '#28a745',
        ],
        'card' => [
            'icon' => 'credit-card',
            'color' => '#007bff',
        ],
        'pay' => [
            'icon' => 'wallet',
            'color' => '#6610f2',
        ],
        'reward_point' => [
            'icon' => 'star',
            'color' => '#ffc107',
        ],
    ],

    'transaction_limits' => [
        'daily_limit' => env('ASSET_DAILY_LIMIT', 1000000),
        'monthly_limit' => env('ASSET_MONTHLY_LIMIT', 10000000),
    ],

];
