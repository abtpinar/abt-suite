<?php

Route::group(
    ['namespace' => 'CommunicationFiles'],
    function () {
        Route::prefix('communication-file')->group(
            function () {
                Route::get('excel', 'CommunicationFileController@exportExcel');
            }
        );

        Route::resource('communication-contract', 'CommunicationFileController');
    }
);
