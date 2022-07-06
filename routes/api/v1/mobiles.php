<?php

Route::group(
    ['namespace' => 'Mobiles'],
    function () {
        Route::resource('mobile', 'MobileController');
    }
);
