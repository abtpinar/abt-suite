<?php

Route::group(
    ['middleware' => 'auth'],
    function () {
        Route::view('/users', 'users.index')->name('users.index');
        Route::group(
            ['namespace' => 'Users'],
            function () {
                Route::resource('user', 'UserController');
            }
        );
    }
);