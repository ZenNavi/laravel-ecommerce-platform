<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reward_points_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('points');
            $table->enum('type', ['earned', 'spent', 'expired', 'refunded', 'bonus']);
            $table->string('source'); // 'purchase', 'referral', 'review', 'signup', etc.
            $table->morphs('sourceable'); // Related model (Order, Referral, etc.)
            $table->text('description')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reward_points_transactions');
    }
};
