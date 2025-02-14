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
        Schema::create('commande', function (Blueprint $table) {
            $table->id('id_commande');
            $table->date('date_commande')->nullable();
            $table->date('date_livraison')->nullable();
            $table->decimal('prix', 10, 2);
            $table->integer('quantite');
            $table->string('commentaire'); // Corrected spelling of 'commentaire'
            $table->string('status');
            $table->decimal('prix_livraison',10,2)->default(0);
            $table->decimal('prix_retour',10,2)->default(0);
            $table->decimal('cost',10,2)->default(0);
            $table->string('numero');
            $table->bigInteger('id_produit')->unsigned();
            $table->string('ville_commande')->nullable();
            // Define foreign key constraints
            $table->foreign('numero')->references('numero')->on('client')->onDelete('cascade');
            $table->foreign('id_produit')->references('id_produit')->on('produit')->onDelete('cascade');
            $table->bigInteger('id_user')->unsigned();
            $table->foreign('id_user')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande');
    }
};
