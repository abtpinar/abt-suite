<?php

namespace App\Data\Repositories\Binders;

use Illuminate\Support\ServiceProvider;

class CLPaymentItemsRepositoryServiceProvider extends ServiceProvider
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
            'App\Data\Repositories\Contracts\CLPaymentItemsRepository',
            'App\Data\Repositories\Implementations\CLPaymentItemsRepository'
        );
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides()
    {
        return ['App\Data\Repositories\Contracts\CLPaymentItemsRepository'];
    }
}
