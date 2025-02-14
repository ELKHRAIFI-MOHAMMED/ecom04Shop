<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table='category';
    protected $primaryKey='id_category';
    protected $fillable=['nom'];
    public $timestamps=false;

    public function commande(){
        return $this->hasMany(Produit::class,'id_category','id_category');
    }
    use HasFactory;
}
