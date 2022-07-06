<?php

namespace App\Support\Binders\Binders;

use App\Support\Binders\BinderManager;
use App\Support\Binders\Contracts\Binder;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Support\Str;

class RepositoriesBinderManager extends BinderManager implements Binder
{
    public function __construct(Str $str)
    {
        parent::__construct($str);
    }

    /**
     * @param Application $app
     */
    public function registerServiceProviders(Application $app)
    {
        $serviceProviderInterface = "Illuminate\\Support\\ServiceProvider";

        $serviceProviders = $this->getValidServiceProviders(
            "App\\Data\\Repositories\\Binders",
            __DIR__ . "/../../../Data/Repositories/Binders",
            $serviceProviderInterface
        );

        foreach ($serviceProviders as $serviceProvider) {
            $app->register($serviceProvider);
        }
    }
}