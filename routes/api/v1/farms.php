<?php
Route::group(
    ['namespace' => 'Farms'],
    function (){
        Route::apiResource('farm', FarmController::class);
    }
);