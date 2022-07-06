<?php

Route::group(
    ['namespace' => 'Users'],
    function () {
        Route::prefix('user')->group(
            function () {
                Route::put('profile', ['uses' => 'UserController@profile']);
                Route::put('updatePassword', ['uses' => 'UserController@updatePassword']);
                Route::get('getAll', ['uses' => 'UserController@getAll']);
                Route::post('activate', ['uses' => 'UserController@activate']);
                Route::post('desactivate', ['uses' => 'UserController@desactivate']);
                Route::get('getUATEnv', ['uses' => 'UserController@getUATEnv']);
                Route::get('getUserById/{id}', ['uses' => 'UserController@getUserById']);
            }
        );
        Route::resource('user', 'UserController');
    }
);