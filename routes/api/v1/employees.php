<?php

Route::group(
    ['namespace' => 'Employees'],
    function () {
        Route::prefix('employee')->group(
            function () {
                Route::get('excel', 'EmployeeController@exportExcel');
            }
        );

        Route::resource('employee', 'EmployeeController');
    }
);
