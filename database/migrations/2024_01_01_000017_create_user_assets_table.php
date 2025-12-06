<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('asset_type_id')->constrained()->onDelete('cascade');
            $table->decimal('balance', 15, 2)->default(0);
            $table->decimal('pending_balance', 15, 2)->default(0); // For pending approvals
            $table->boolean('is_active')->default(true);
            $table->timestamp('last_transaction_at')->nullable();
            $table->timestamps();

            $table->unique(['user_id', 'asset_type_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_assets');
    }
};
