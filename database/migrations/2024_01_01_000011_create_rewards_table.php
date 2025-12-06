<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rewards', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->integer('points_required');
            $table->enum('type', ['discount', 'product', 'voucher', 'cashback']);
            $table->decimal('value', 10, 2)->nullable(); // Discount amount or cashback value
            $table->foreignId('product_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('voucher_code')->nullable();
            $table->integer('quantity')->nullable();
            $table->integer('redeemed_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->date('valid_from')->nullable();
            $table->date('valid_until')->nullable();
            $table->timestamps();
        });

        Schema::create('reward_redemptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('reward_id')->constrained()->onDelete('cascade');
            $table->integer('points_spent');
            $table->string('redemption_code')->unique();
            $table->enum('status', ['pending', 'completed', 'cancelled'])->default('pending');
            $table->timestamp('used_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reward_redemptions');
        Schema::dropIfExists('rewards');
    }
};
