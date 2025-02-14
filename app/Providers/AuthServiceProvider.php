<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }
/**
    /**
     * Les mappings des policies du modèle vers leur politique.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        ' App\Models\User'=> 'App\Policies\UserPermissionPolicy',
    ];

    /**
     * Enregistrer les services d'authentification / autorisation.
     */
    public function boot()
    {
        $this->registerPolicies();

        // Exemple de Gate si nécessaire
        // Gate::define('CommandeControle', function ($user) {
        //     return $user->hasPermission('CommandeControle'); // Exemple
        // });
    }
}
