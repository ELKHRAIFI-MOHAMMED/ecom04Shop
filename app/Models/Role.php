<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table='role';
    protected $primaryKey='id_role';
    protected $fillable=['nom_role','id_role'];
    public $timestamps=false;

    public function user(){
        return $this->belongsTo(User::class,'id_role','id_role');
    }
    use HasFactory;
}
