<?php

namespace App\Support\Binders\Contracts;

use Illuminate\Contracts\Foundation\Application;

interface Binder
{
    function registerServiceProviders(Application $app);
}