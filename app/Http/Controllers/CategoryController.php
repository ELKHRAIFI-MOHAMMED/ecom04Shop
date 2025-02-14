<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Commande;
use App\Models\Category;
use App\Models\Produit;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list=DB::select(
            'select category.*,count(produit.id_produit) as nombre_produit   from category
            left join produit on produit.id_category=category.id_category
            group by category.id_category'
        );
        return $list;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       $categorys=Category::create([
             'nom'=>$request->nom
       ]);
       return $categorys;
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
{
    // Delete the category by ID

    $produit = Category::where('id_category',$id)->get();
    $produit[0]->delete();
    return $produit[0];
    // // Check if the deletion was successful
    // if ($deleted) {
    //     return response()->json(['message' => 'Category deleted successfully'], 200);
    // } else {
    //     return response()->json(['message' => 'Category not found'], 404);
    // }
}

    public function produit_category($idc){
        $produits=Produit::where('id_category',$idc)->get();
        return $produits;
    }
}
