<?php

Route::group(
    ['namespace' => 'CLPayments'],
    function () {
        Route::prefix('cl-payments')->group(
            function () {
                Route::get('excel', 'CLPaymentController@exportExcel');
            }
        );
        Route::resource('cl-payment', 'CLPaymentController');
    }
);
