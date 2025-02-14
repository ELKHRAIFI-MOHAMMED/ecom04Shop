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
        Schema::create(('produit'),function(Blueprint $table){
            $table->id('id_produit');
            $table->string('nom');
            $table->string('image');
            $table->string('quantite');
            $table->string('prix_produit');
            $table->bigInteger('id_category')->unsigned();
            $table->foreign('id_category')->references('id_category')->on('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit');
    }
};
