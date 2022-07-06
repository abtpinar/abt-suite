<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Data\Repositories\Contracts\AbstractRepository;
use App\Data\Repositories\Implementations\AbstractRepository as RepositoryImplementation;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(AbstractRepository::class, RepositoryImplementation::class);
    }
}
