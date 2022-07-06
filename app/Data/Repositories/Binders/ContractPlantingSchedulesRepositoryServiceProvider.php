<?php

namespace App\Data\Repositories\Binders;

use Illuminate\Support\ServiceProvider;

class ContractPlantingSchedulesRepositoryServiceProvider extends ServiceProvider
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
            'App\Data\Repositories\Contracts\ContractPlantingSchedulesRepository',
            'App\Data\Repositories\Implementations\ContractPlantingSchedulesRepository'
        );
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['App\Data\Repositories\Contracts\ContractPlantingSchedulesRepository'];
    }
}
