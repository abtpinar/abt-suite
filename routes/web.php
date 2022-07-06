<?php

Route::get('cyberline-logs', '\Rap2hpoutre\LaravelLogViewer\LogViewerController@index');

Route::get(
    '/',
    function () {
        View::addExtension('html', 'php');

        return View::make('index');
    }
);
