<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Commande;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        if (auth()->user()->role->nom_role == "super_admin") {
            $list = Commande::join('client', 'client.numero', '=', 'commande.numero')
                ->join('produit', 'produit.id_produit', '=', 'commande.id_produit')
                ->select('client.nom as nom_c', 'commande.*', 'client.*', 'produit.*')
                ->get();
            return response()->json($list, 200);
        };
        $list = Commande::join('client', 'client.numero', '=', 'commande.numero')
            ->join('produit', 'produit.id_produit', '=', 'commande.id_produit')
            ->select('client.nom as nom_c', 'commande.*', 'client.*', 'produit.*')
            ->where('commande.id_user', auth()->user()->id)
            ->get();
        return response()->json($list, 200);
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
        //request se form de ex"{"quntite":"2","prix_livraison":"24","prix":"155","commentaire":"walo","status":"en cour","numero":"0645635463","id_produit":"1","date_commande":"2024-09-03"}"
        $validator = Validator::make($request->all(), [
            'quntite' => 'required|integer',
            'prix_livraison' => 'required',
            'prix' => 'required',
            'commentaire' => 'max:200|string',
            'status' => 'required|string',
            'numero' => 'required|string|digits:10',
            'id_produit' => 'required|integer',
            'date_commande' => 'required|date',
            'ville_commande' => 'required',

        ], [
            'numero.required' => 'Le champ numéro est requis.',
            'numero.string' => 'Le champ numéro doit être un string.',
            'numero.digits' => 'Le champ numéro doit être composé de 10 chiffres.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $new = $validator->validated();
        // return $new;
        $commande = Commande::create([
            'date_commande' => $new['date_commande'],
            'ville_commande' => $new['ville_commande'],
            'prix' => $new['prix'],
            'prix_livraison' => $new['prix_livraison'],
            'quantite' => $new['quntite'],
            'status' => $new['status'],
            'commentaire' => $new['commentaire'],
            'numero' => $new['numero'],
            'id_produit' => $new['id_produit'],
            'prix_retour' => 0,
            'cost' => null,
            'id_user' => auth()->user()->id,
            'date_livraison' => null
        ]);
        return response()->json($commande, 201);
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

    public function up_dtae_status(Request $request, $idc)
    {
        $cmd = Commande::findOrFail($idc);
        if ($request->nom == 'livrer') {
            $cmd->update([
                'status' => $request->nom,
                'date_livraison' => $request->date_livraison,
                'prix_retour' => $request->prix

            ]);
            return $cmd;
        }
        if ($request->nom == 'refuser') {
            $cmd->update([
                'status' => $request->nom,
                'date_livraison' => $request->date_livraison,
                'prix_retour' => $request->prix,
                'prix_livraison' => 0,
                'date_livraison' => null
            ]);
            return $cmd;
        }
        $cmd->update([
            'status' => $request->nom,
            'prix_retour' => $request->prix,
            'date_livraison' => null
        ]);
        return $cmd;
    }
}
