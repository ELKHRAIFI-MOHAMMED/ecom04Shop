<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function register(Request $request){
        //return $request;
        // Validez les données d'entrée si nécessaire
        $validator = Validator::make($request->all(), [
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|unique:users',
            'password'=>'required|min:6',
            'id_role'=>'required|integer',
            'Confirmer_password' => 'required|same:password'
        ],[
            'name.required' => 'Le champ name est requis',
            'email.required' => 'Le champ email est requis',
            'password.required' => 'Le champ password est requis',
            'id_role.required' => 'Le champ role est requis',
            'name.string' => 'Le champ name doit être une chaîne de caractères',
            'email.string' => 'Le champ email doit être une chaîne de caractères',
            'password.min' => 'Le mot de passe doit contenir au moins 8 caractères',
            'email.email' => 'Le champ doit être un email valide',
            'email.unique' => 'Cet email existe déjà',
            'Confirmer_password.required' => 'Veuillez confirmer votre mot de passe',
            'Confirmer_password.same' => 'Les mots de passe ne correspondent pas',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password),
            'id_role'=>$request->id_role,
            'permition'=>([
                'details_commandes' => false,
                'utilisateurs' => false,
                'commandes' => false,
                'categorys' => false,
                'produits' => false,
                'depence' => false,
                'chiffre' => false,
                "graphe"=>false
            ])
        ]);
        return response()->json($user, 201); // Retournez une réponse JSON
    }








    public function login(Request $request){
        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return response()->json([
                'success'=>false,
                'message'=>'incorect email or password '
            ]);
        }
        $user=auth()->user();
        $token=$user->createToken('login_token');
        return response()->json([
            'id_user'=>$user->id,
            'user'=>$user,
            'id_role'=>$user->id_role,
            'token'=>$token->plainTextToken,
            'success'=>true,
            'message'=>'login recus',

        ]);
    }

    public function index(){
        $users=User::with('role')->get();
        return response()->json($users, 200);
    }

    public function profile(){
        return auth()->user();
    }

    public function logout()
{

    // Vérifier si l'utilisateur authentifié a un jeton et le supprimer
    if (auth()->check() && auth()->user()->currentAccessToken()) {
        auth()->user()->currentAccessToken()->delete();
    }

    // Réponse de succès après la déconnexion
    return response()->json(['message' => 'Logged out successfully']);
}

}
