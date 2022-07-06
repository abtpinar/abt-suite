<?php

Route::group(
    ['namespace' => 'CommunicationFileComponents'],
    function () {
        Route::resource('communication-file-component', 'CommunicationFileComponentController');
    }
);
