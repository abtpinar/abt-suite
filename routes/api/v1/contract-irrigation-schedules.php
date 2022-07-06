<?php

Route::group(
    ['namespace' => 'ContractIrrigationSchedules'],
    function () {
        Route::resource('contract-irrigation-schedule', 'ContractIrrigationScheduleController');
    }
);
