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
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID do usuário que é o comerciante dono do cliente
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');   // comeeciante dono do cliente
            $table->string('nome');
            $table->string('cpf_cnpj')->unique();
            $table->string('telefone')->nullable();
            $table->string('endereco')->nullable();
            $table->date('nascimento')->nullable();
            $table->text('historico_compras')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
        Schema::table('clientes', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
    }
};
