<?php

Route::group(
    ['namespace' => 'ContractTobaccoClassSchedules'],
    function () {
        Route::resource('contract-tobacco-class-schedule', 'ContractTobaccoClassScheduleController');
    }
);
