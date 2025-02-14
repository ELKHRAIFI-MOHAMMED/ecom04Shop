<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Depence;
use App\Models\Commande;
use App\Models\Produit;
use App\Models\User;
use App\Models\Category;
class CalculController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(auth()->user()->role->nom_role=='super_admin'){
            $list_commande=Commande::join('produit','produit.id_produit','=','commande.id_produit')
        ->join('category','category.id_category','=','produit.id_category')
        ->join('users','users.id','=','commande.id_user')
        ->select('users.name','commande.*','produit.nom as nom_produit','produit.prix_produit','category.nom as nom_category')
        ->get();
        return $list_commande;
        }
        if(auth()->user()->role->nom_role=='admin'){
            $list_commande=Commande::join('produit','produit.id_produit','=','commande.id_produit')
        ->join('category','category.id_category','=','produit.id_category')
        ->join('users','users.id','=','commande.id_user')
        ->select('users.name','commande.*','produit.nom as nom_produit','produit.prix_produit','category.nom as nom_category')
        ->where('commande.id_user','=',auth()->user()->id)
        ->get();
        return $list_commande;
        }


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
        //
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
        //
    }
}
