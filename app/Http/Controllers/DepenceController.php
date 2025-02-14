<?php

namespace App\Http\Controllers;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;
use App\Models\Depence;
use Illuminate\Support\Facades\Validator;

class DepenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if(auth()->user()->role->nom_role==='super_admin'){
            $list_depence=Depence::join('users','depence.id_user','users.id')->select('depence.*','users.name')->get();
            return response()->json($list_depence, 200);
        }
        if(auth()->user()->role->nom_role==='admin'){
            $list_depence=Depence::join('users','depence.id_user','users.id')->select('depence.*','users.name')->where('depence.id_user','=',auth()->user()->id)->get();
            return response()->json($list_depence, 200);
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
        if($request->hasFile('description')){

            $validator = Validator::make($request->all(), [
                'nom'=>'required|string|max:255',
                'description'=>'required|file',
                'date_depence'=>'required|date',
            ],[
                'nom.required' => 'Le champ nom est obligatoire.',
                'description.required' => 'Le champ description est obligatoire.',
                'date_depence.required' => 'La date de dépense est obligatoire.',
                'date_depence.date' => 'La date de dépense doit être une date valide.',

            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $file=$request->file('description');
            $file_name=time().'.'.$file->getClientOriginalExtension();
            $file->storeAs('public/depence',$file_name);


            $depence=Depence::create([
                'nom'=>$request->nom,
                'description'=>$file_name,
                'date_depence'=>$request->date_depence,
                'montant'=>$request->montant,
                'id_user'=>auth()->user()->id
            ]);
            return response()->json($depence, 201);
        }else{
            $validator = Validator::make($request->all(), [
                'nom'=>'required|string|max:255',
                'description'=>'required|string|max:1000',
                'date_depence'=>'required|date',
            ],[
                'nom.required' => 'Le champ nom est obligatoire.',
                'description.required' => 'Le champ description est obligatoire.',
                'date_depence.required' => 'La date de dépense est obligatoire.',
                'date_depence.date' => 'La date de dépense doit être une date valide.',

            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }



            $depence=Depence::create([
                'nom'=>$request->nom,
                'description'=>$request->description,
                'date_depence'=>$request->date_depence,
                'montant'=>$request->montant,
                'id_user'=>auth()->user()->id
            ]);
            return response()->json($depence, 201);
        }


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
