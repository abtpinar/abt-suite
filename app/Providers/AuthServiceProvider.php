<?php

namespace App\Providers;

use App\Data\Entities\ContractRetrieve;
use App\Data\Entities\Permission;
use App\Policies\ContractRetrievePolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     * @var array
     */
    protected $policies = [
        ContractRetrieve::class => ContractRetrievePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        if (!app()->runningInConsole()) {
//            Permission::get()->map(
//                function ($permission) {
//                    Gate::define(
//                        $permission->name,
//                        function ($user) use ($permission) {
//                            return $user->hasAccess($permission->name);
//                        }
//                    );
//                }
//            );
        }
    }
}
