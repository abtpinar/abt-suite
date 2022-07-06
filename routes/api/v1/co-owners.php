<?php
Route::group(
    ['namespace' => 'CoOwners'],
    function (){
        Route::apiResource('co-owner', CoOwnerController::class);
    }
);