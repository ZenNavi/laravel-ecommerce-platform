<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('asset_types', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique(); // 'cash', 'card', 'pay', 'reward_point'
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->enum('category', ['cash_equivalent', 'point', 'credit'])->default('cash_equivalent');
            $table->boolean('requires_approval')->default(false); // Pay needs approval
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->json('settings')->nullable(); // Additional settings per type
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('asset_types');
    }
};
