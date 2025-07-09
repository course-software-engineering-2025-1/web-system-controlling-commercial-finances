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
        Schema::create('fornecedores', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id'); // ID do usuário que é o comerciante dono do fornecedor
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade'); // comerciante dono do fornecedor
            $table->string('nome');
            $table->string('cnpj')->unique();
            $table->string('contato');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fornecedores');

        Schema::table('fornecedores', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
    }
};
