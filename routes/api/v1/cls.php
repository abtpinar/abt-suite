<?php

Route::group(
    ['namespace' => 'CLs'],
    function () {
        Route::prefix('cls')->group(
            function () {
                Route::get('process', 'CLController@processCLs');
                Route::get('update-sipac', 'CLController@updateFromSIPAC');
                Route::post('set-expense', ['uses' => 'CLController@setExpense']);
                Route::post('set-payment', ['uses' => 'CLController@setPayment']);
                Route::get('get-units', ['uses' => 'CLController@getUnits']);
                Route::get('overview', ['uses' => 'CLController@getOverview']);
                Route::get('excel', 'CLController@exportExcel');
                Route::get('download-pdf', ['uses' => 'CLController@exportPDF']);
            }
        );
        Route::resource('cl', 'CLController');
    }
);
