<?php

namespace App\Data\Repositories\Binders;

use Illuminate\Support\ServiceProvider;

class MobileBrandsRepositoryServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(
            'App\Data\Repositories\Contracts\MobileBrandsRepository',
            'App\Data\Repositories\Implementations\MobileBrandsRepository'
        );
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['App\Data\Repositories\Contracts\MobileBrandsRepository'];
    }
}
