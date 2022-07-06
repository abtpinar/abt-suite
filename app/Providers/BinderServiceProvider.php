<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BinderServiceProvider extends ServiceProvider
{

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        $binderManager = $this->app->make('App\Support\Binders\BinderManager');
        $binderManager->register($this->app);
    }
}