<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a document_type which
| is assigned the "api" middleware document_type. Enjoy building your API!
|
 */

use Symfony\Component\HttpFoundation\File\Exception\FileNotFoundException;

Route::prefix('v1')->group(
    function () {
        Route::group(
            ['middleware' => 'jwt.auth'],
            function () {
                $routePartials = [
                    'users',
                    'code_tables',
                    'farmers',
                    'products',
                    'cls',
                    'cl-payments',
                    'cl-payment-items',
                    'contracts',
                    'contract-planting-schedules',
                    'contract-irrigation-schedules',
                    'contract-harvest-schedules',
                    'contract-tobacco-class-schedules',
                    'contract-products',
                    'tobacco_classes',
                    'communication_contracts',
                    'employees',
                    'sims',
                    'mobiles',
                    'mobile_brands',
                    'mobile_models',
                    'production-units',
                    'communication-files',
                    'communication-file-components',
                    'farms',
                    'allotments',
                    'co-owners'
                ];

                foreach ($routePartials as $partial) {
                    $file = base_path('routes/api/v1/' . $partial . '.php');

                    if (!file_exists($file)) {
                        $msg = "Route partial [{$partial}] not found.";
                        throw new FileNotFoundException($msg);
                    }

                    require $file;
                }
            }
        );

        Route::post('login', 'Auth\AuthController@login');
        Route::get('refresh', 'Auth\AuthController@refresh');
        Route::post('register', 'Auth\RegisterController@register');
        Route::get('logout', 'Auth\AuthController@logout');

        Route::group(
            ['namespace' => 'Users'],
            function () {
                Route::prefix('user')->group(
                    function () {
                        Route::post('enable', ['uses' => 'UserController@enable']);
                    }
                );
            }
        );
    }
);
