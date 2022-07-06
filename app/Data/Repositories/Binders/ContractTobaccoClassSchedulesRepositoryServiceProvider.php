<?php

namespace App\Data\Repositories\Binders;

use Illuminate\Support\ServiceProvider;

class ContractTobaccoClassSchedulesRepositoryServiceProvider extends ServiceProvider
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
            'App\Data\Repositories\Contracts\ContractTobaccoClassSchedulesRepository',
            'App\Data\Repositories\Implementations\ContractTobaccoClassSchedulesRepository'
        );
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['App\Data\Repositories\Contracts\ContractTobaccoClassSchedulesRepository'];
    }
}
