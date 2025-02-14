<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ResponseController extends Controller
{
    public function validated_response($data,$status,$success){
        return response()->json([
            'data'=>$data,
            'status'=>$status,
            'success'=>$success
        ]);
    }
}
