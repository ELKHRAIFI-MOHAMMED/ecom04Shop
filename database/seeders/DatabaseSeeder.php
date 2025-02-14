<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\DB;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();


        User::factory()->create([
            'name' => 'mohamed',
            'email' => 'super@admin.com',
            'password'=>'123123',
            'id_role'=>"2",
            'permition'=>([
                'details_commandes' => true,
                'utilisateurs' => true,
                'commandes' => true,
                'categorys' => true,
                'produits' => true,
                'depence' => true,
                'chiffre' => true,
                "graphe"=>true
            ])
        ]);
        // DB::table('produit')->insert([
        //     'nom' => 'produit 3',
        //     'image' => 'image3.text',
        //     'id_category'=>1
        // ]);
    }
}
