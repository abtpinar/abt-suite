<?php

Route::group(
    ['namespace' => 'MobileModels'],
    function () {
        Route::prefix('mobile-model')->group(
            function () {
                Route::get('excel', 'MobileModelController@exportExcel');
            }
        );

        Route::resource('mobile-model', 'MobileModelController');
    }
);
