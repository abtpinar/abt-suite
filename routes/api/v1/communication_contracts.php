<?php

Route::group(
    ['namespace' => 'CommunicationContracts'],
    function () {
        Route::prefix('communication-contract')->group(
            function () {
                Route::get('excel', 'CommunicationContractController@exportExcel');
            }
        );

        Route::resource('communication-contract', 'CommunicationContractController');
    }
);
