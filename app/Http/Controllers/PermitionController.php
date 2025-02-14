<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class PermitionController extends Controller
{
    public function affecter_permition(Request $request,$id_user){
        if(auth()->user()->role->nom_role==='super_admin'){
            //User::with('role')->get()
            $user=User::with('role')->where('id',$id_user)->get();
            $user[0]->update([
                'permition'=>$request->all()
            ]);
            return response()->json($user[0], 200);
        }else{
            $user=User::with('role')->where('id',$id_user)->get();
            if($user[0]->role->nom_role!=='super_admin'){
                $user[0]->update([
                    'permition'=>$request->all()
                ]);
                return response()->json($user[0], 200);
            }
            return response()->json(404);;
        }

    }

}
