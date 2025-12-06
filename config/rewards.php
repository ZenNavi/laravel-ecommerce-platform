<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Reward System Configuration
    |--------------------------------------------------------------------------
    */

    'points_per_purchase' => env('REWARD_POINTS_PER_PURCHASE', 10),

    'referral_bonus_points' => env('REFERRAL_BONUS_POINTS', 100),

    'points_to_currency_ratio' => env('POINTS_TO_CURRENCY_RATIO', 0.01), // 1 point = $0.01

    'points_expiry_days' => env('POINTS_EXPIRY_DAYS', 365),

];
