<?php

Route::group(
    ['namespace' => 'Products'],
    function () {
        Route::prefix('product')->group(
            function () {
                Route::get('excel', 'ProductController@exportExcel');
                Route::post('excel-import', [\App\Http\Controllers\Products\ProductController::class, 'importFromExcel']);
            }
        );

        Route::resource('product', 'ProductController');
    }
);
