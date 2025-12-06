<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asset_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('asset_type_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_asset_id')->constrained()->onDelete('cascade');
            $table->decimal('amount', 15, 2);
            $table->enum('type', ['credit', 'debit']); // credit = 추가, debit = 차감
            $table->enum('transaction_type', [
                'purchase',
                'refund',
                'charge',
                'withdrawal',
                'transfer',
                'reward',
                'adjustment'
            ]);
            $table->string('source')->nullable(); // 'order', 'payment', 'charge_request', etc.
            $table->morphs('sourceable'); // Related model
            $table->text('description')->nullable();
            $table->decimal('balance_before', 15, 2);
            $table->decimal('balance_after', 15, 2);
            $table->enum('status', ['pending', 'completed', 'cancelled', 'failed'])->default('completed');
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'asset_type_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asset_transactions');
    }
};
