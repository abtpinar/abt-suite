<?php


return [

    /*
    |--------------------------------------------------------------------------
    | Configuration variables used in the logic of the app command: poblate-db
    |--------------------------------------------------------------------------
    |
    |   iteration_count_test: Number of cups and clients that you want to generate
    |   iteration_count_contract: Numbers of contract per clients that you want to generate.
    |	  iteration_count_offer: Numbers of offer per clients that you want to generate.
    |
 */


    "iteration_count_test" => env('ITERATION_COUNT_TEST'),
    "iteration_count_contract" => env('ITERATION_COUNT_CONTRACT'),
    "iteration_count_offer" => env('ITERATION_COUNT_OFFER')


];
