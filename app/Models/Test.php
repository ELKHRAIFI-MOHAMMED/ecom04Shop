<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Test extends Model
{
    protected $table='test';
    protected $primaryKey='id';
    protected $fillable=['caracteristiques','nom'];
    protected $casts = [
        'caracteristiques' => 'array', // Automatiquement converti en tableau PHP
    ];
    public $timestamps=false;

    use HasFactory;
}
