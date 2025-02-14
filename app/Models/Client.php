<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table='client';
    protected $primarykey='numero';
    protected $fillable=['numero','nom','adresse','ville'];
    public $timestamps=false;

    public function commande(){
        return $this->hasMany(Commande::class,'numero','numero');
    }
    use HasFactory;
}
