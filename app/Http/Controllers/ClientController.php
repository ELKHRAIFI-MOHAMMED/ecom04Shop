<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\ClientRequest; // Import de la requête personnalisée
use App\Models\Client; 

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            // request se form de {"numero_client":"0645635463","nom_client":"hamid","ville":"casa","adresse_client":"sbata"}
            $validator = Validator::make($request->all(), [
                'numero_client' => 'required|string|digits:10',
                'nom_client'=>'required|string|max:50',
                'ville'=>'required|string|max:50',
                'adresse_client'=>'required|string|max:200'
            ], [
                'numero_client.required' => 'Le champ numéro est requis.',
                'numero_client.string' => 'Le champ numéro doit être un entier.',
                'numero_client.digits' => 'Le champ numéro doit être composé de 10 chiffres.',
                'nom_client.required'=>'le champ nom est requis',
                'nom_client.string'=>"le champ nom doit etre un string ",
                'nom_client.max'=>'le champ nom avait au max 50 caractaires',
                'ville.required'=>'le champ ville est requis',
                'ville.string'=>"le champ ville doit etre un string ",
                'ville.max'=>'le champ ville avait au max 50 caractaires',
                'adresse_client.required'=>'le champ adresse est requis',
                'adresse_client.string'=>"le champ adresse doit etre un string ",
                'adresse_client.max'=>'le champ adresse avait au max 200 caractaires'
            ]);
        
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            $new_client=$validator->validated();
            $client=Client::where('numero','=',$new_client["numero_client"])->get();
            if($client->count()==0){
               // return $new_client;
                $client=Client::create([
                    'numero'=>$new_client["numero_client"],
                    'nom'=>$new_client["nom_client"],
                    'ville'=>$new_client["ville"],
                    'adresse'=>$new_client["adresse_client"],
                ]);
                return response()->json($client, 201);
            }
            return response()->json($client[0], 200);
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
