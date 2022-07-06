<?php
Route::group(
    ['namespace' => 'Allotments'],
    function (){
        Route::apiResource('allotment', AllotmentController::class);
    }
);