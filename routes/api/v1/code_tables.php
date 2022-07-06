<?php

Route::group(
    ['namespace' => 'CodeTables'],
    function () {
        Route::prefix('code_tables')->group(
            function () {
                Route::get('/combined', ['uses' => 'CodeTablesController@getCodesCombined']);
                Route::get('/{table_key}', ['uses' => 'CodeTablesController@getCodes']);
            }
        );
    }
);