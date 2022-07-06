<?php

Route::group(
    ['namespace' => 'TobaccoClasses'],
    function () {
        Route::prefix('tobacco-class')->group(
            function () {
                Route::get('excel', 'TobaccoClassController@exportExcel');
            }
        );

        Route::resource('tobacco-class', 'TobaccoClassController');
    }
);
