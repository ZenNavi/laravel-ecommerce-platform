<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pay_charge_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('request_number')->unique();
            $table->decimal('amount', 15, 2);
            $table->string('payment_method')->nullable(); // 'bank_transfer', 'credit_card', etc.
            $table->enum('status', ['pending', 'approved', 'rejected', 'cancelled'])->default('pending');
            $table->text('note')->nullable(); // User's note
            $table->text('admin_note')->nullable(); // Admin's note
            $table->json('payment_proof')->nullable(); // Upload receipts/proofs
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamp('rejected_at')->nullable();
            $table->foreignId('asset_transaction_id')->nullable()->constrained()->onDelete('set null');
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pay_charge_requests');
    }
};
