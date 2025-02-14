<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Test;
class TestController extends Controller
{
    public function index(){
        $list_test=Test::all();
        return $list_test;
    }
}
