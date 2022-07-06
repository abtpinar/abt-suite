<?php

Route::group(
    ['namespace' => 'CLPaymentItems'],
    function () {
        Route::resource('cl-payment-item', 'CLPaymentItemController');
    }
);
