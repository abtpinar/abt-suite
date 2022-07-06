<?php

Route::group(
    ['namespace' => 'Sims'],
    function () {
        Route::resource('sim', 'SimController');
    }
);
