<?php

Route::group(
    ['namespace' => 'Farmers'],
    function () {
        Route::prefix('farmer')->group(
            function () {
                Route::get('excel', 'FarmerController@exportExcel');
            }
        );

        Route::resource('farmer', 'FarmerController');
        Route::get('farmer/download-contracts-pdf/{id}', ['uses' => 'FarmerController@exportContractsToPDF']);
    }
);
