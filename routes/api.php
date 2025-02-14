<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\DepenceController;
use App\Http\Controllers\CalculController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\PermitionController;
// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::resource('calcul',CalculController::class)->middleware('auth:sanctum');
Route::resource('depence',DepenceController::class)->middleware('auth:sanctum');
Route::resource('produit',ProduitController::class)->middleware('auth:sanctum');
Route::put('/produit/qnt/{id}',[ProduitController::class,'edit_qnt'])->middleware('auth:sanctum');
Route::resource('client',ClientController::class)->middleware('auth:sanctum');
Route::resource('category',CategoryController::class)->middleware('auth:sanctum');
Route::resource('commande',CommandeController::class)->middleware('auth:sanctum');
Route::get('commande/{id_user}',[CommandeController::class,'indexx'])->middleware('auth:sanctum');
Route::resource('role',RoleController::class)->middleware('auth:sanctum');
Route::put('commande/status/{idc}',[CommandeController::class,'up_dtae_status'])->middleware('auth:sanctum');
Route::post('produitt/{id}',[ProduitController::class,'up_dtae_image'])->middleware('auth:sanctum');
Route::get('category/produit/{idc}',[CategoryController::class,'produit_category'])->middleware('auth:sanctum');

/////login
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/register', [LoginController::class, 'register'])->name('register');
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [LoginController::class, 'index'])->name('index');
Route::post('/profile', [LoginController::class, 'user'])->name('test')->middleware('auth:sanctum');




Route::post("/permition/{id_user}",[PermitionController::class,'affecter_permition'])->middleware('auth:sanctum');;




