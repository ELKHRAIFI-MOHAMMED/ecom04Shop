<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    protected $table='produit';
    protected $primaryKey='id_produit';
    protected $fillable=['nom','image','quantite','id_category','prix_produit'];
    public $timestamps=false;

    public function commande(){
        return $this->hasMany(Commande::class,'id_produit','id_produit');
    }

    public function category(){
        return $this->belongsTo(Category::class,'id_category','id_category');
    }

}
