<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->integer('account_id'); // 1, 2, 3
            $table->decimal('amount', 10, 2);
            $table->string('category');
            $table->string('subcategory')->nullable();
            $table->text('description');
            $table->date('date');
            $table->string('location')->nullable();
            $table->boolean('is_recurring')->default(false);
            $table->string('type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
