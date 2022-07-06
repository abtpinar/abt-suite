<?php

Route::group(
    ['namespace' => 'ContractHarvestSchedules'],
    function () {
        Route::resource('contract-harvest-schedule', 'ContractHarvestScheduleController');
    }
);
