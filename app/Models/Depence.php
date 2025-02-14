<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Depence extends Model
{
    protected $table='depence';
    protected $primaryKey='id_depence';
    protected $fillable=['id_depence','nom','description','id_user','date_depence','montant'];
    public $timestamps=false;


    public function user(){
        return $this->belongsTo(User::class,'id_user','id_user');
    }
    use HasFactory;
}
