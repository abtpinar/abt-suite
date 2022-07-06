<?php

Route::group(
    ['namespace' => 'ContractPlantingSchedules'],
    function () {
        Route::resource('contract-planting-schedule', 'ContractPlantingScheduleController');
    }
);
