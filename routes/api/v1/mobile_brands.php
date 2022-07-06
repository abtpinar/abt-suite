<?php

Route::group(
    ['namespace' => 'MobileBrands'],
    function () {
        Route::prefix('mobile-brand')->group(
            function () {
                Route::get('excel', 'MobileBrandController@exportExcel');
            }
        );

        Route::resource('mobile-brand', 'MobileBrandController');
    }
);
