<?php

Route::group(
    ['namespace' => 'Contracts'],
    function () {
        Route::prefix('contract')->group(
            function () {
                Route::get('excel', 'ContractController@exportExcel');
            }
        );

        Route::resource('contract', 'ContractController');
        Route::get('contract/download-pdf/{id}', ['uses' => 'ContractController@exportPDF']);
        Route::get('contract/contracts-download-pdf/valance', ['uses' => 'ContractController@exportContractsValancePDF']);
    }
);
