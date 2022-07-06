<?php

Route::group(
    ['namespace' => 'ContractProducts'],
    function () {
        Route::resource('contract-product', 'ContractProductController');
    }
);
