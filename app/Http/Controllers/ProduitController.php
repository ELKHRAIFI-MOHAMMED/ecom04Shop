<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $list=Produit::all();
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
        if($request->hasFile('image')){
            $image=$request->file('image');
            $file_name=time().'.'.$image->getClientOriginalExtension();
            $image->move('image',$file_name);
            $new_product=Produit::create([
                'nom'=>$request->nom,
                'image'=>$file_name,
                'prix_produit'=>$request->prix,
                'quantite'=>$request->quantite,
                'id_category'=>$request->category
            ]);
            return $request->all();
        }
        return ';;;;;';

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
    public function up_dtae_image(Request $request,$id){
        $produit=Produit::find($id);
        if($request->hasFile('image')){
            $disk='public';
            if(Storage::disk($disk)->exists($produit->image)){
                Storage::disk($disk)->delete($produit->image);
            }
            $image=$request->file('image');
            $file_name=time().'.'.$image->getClientOriginalExtension();
            $image->storeAs('public',$file_name);
            $produit->update([
                'nom'=>$request->nom,
                'image'=>$file_name,
                'prix_produit'=>$request->prix_produit,
                'quantite'=>$request->quantite,
                'id_category'=>$request->id_category
            ]);
            return $produit;

        }else{
            $produit->update([
                'nom'=>$request->nom,
                'prix_produit'=>$request->prix_produit,
                'quantite'=>$request->quantite,
                'id_category'=>$request->id_category
            ]);
            return $produit;

        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //return $request->all();
        $produit=Produit::find($id);
        //return $produit;
        if($request->hasFile('image')){
            $disk='public';
            if(Storage::disk($disk)->exists($produit->image)){
                Storage::disk($disk)->delete($produit->image);
            }
            $image=$request->file('image');
            $file_name=time().'.'.$image->getClientOriginalExtension();
            $image->storeAs('public',$file_name);
            $produit->update([
                'nom'=>$request->nom,
                'image'=>$file_name,
                'prix_produit'=>$request->prix_produit,
                'quantite'=>$request->quantite,
                'id_category'=>$request->id_category
            ]);
            return $produit;
        }
        $produit->update([
            'nom'=>$request->nom,
            'prix_produit'=>$request->prix_produit,
                'quantite'=>$request->quantite,
                'id_category'=>$request->id_category
        ]);
        return $produit;



    }

    /**
     * Remove the specified resource from storage.
     */
    public function edit_qnt (Request $request,string $id)
    {
        $produit=Produit::findOrFail($id);
        $produit->update([
            'quantite'=>$produit->quantite-($request->new_qnt-$request->old_qnt),
        ]);
        return response()->json($produit, 200);

    }

    public function destroy(string $id)
    {
        $produit=Produit::findOrFail($id);
        $produit->delete();

    }
}
