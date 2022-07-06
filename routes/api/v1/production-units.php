<?php

Route::group(
    ['namespace' => 'ProductionUnits'],
    function () {
        Route::prefix('production-unit')->group(
            function () {
                Route::get('excel', 'ProductionUnitController@exportExcel');
            }
        );

        Route::resource('production-unit', 'ProductionUnitController');
    }
);
