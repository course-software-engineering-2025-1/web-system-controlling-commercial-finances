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
            $table->foreignId('conta_id')->constrained('accounts');
            $table->foreignId('categoria_id')->nullable()->constrained('categories');
            $table->enum('tipo', ['receita', 'despesa', 'transferencia']);
            $table->decimal('valor', 12, 2);
            $table->string('descricao')->nullable();
            $table->date('data');
            $table->foreignId('conta_destino_id')->nullable()->constrained('accounts'); // se for transferência
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

