<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $table='commande';
    protected $primaryKey='id_commande';
    protected $fillable=['prix','quantite','ville_commande','prix_livraison','status','commentaire','numero','id_produit','date_commande',"prix_retour","date_livraison",'id_user'];
    public $timestamps=false;

    public function produit(){
        return $this->belongsTo(Produit::class,'id_produit','id_produit');
    }
    public function client(){
        return $this->belongsTo(Client::class,'numero','numero');
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    use HasFactory;
}
