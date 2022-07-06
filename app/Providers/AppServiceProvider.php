<?php

namespace App\Providers;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        /**
         * Register Bugsnag as the error tracker
         * only if we are in production
         */
        if (config("app.env") == "production") {
            $this->app->alias('bugsnag.logger', \Psr\Log\LoggerInterface::class);
        }
    }
}
