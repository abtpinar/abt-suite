<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default filesystem disk that should be used
    | by the framework. The "local" disk, as well as a variety of cloud
    | based disks are available to your application. Just store away!
    |
    */

    'default' => env('FILESYSTEM_DRIVER', 'local'),

    /*
    |--------------------------------------------------------------------------
    | Default Cloud Filesystem Disk
    |--------------------------------------------------------------------------
    |
    | Many applications store files both locally and in the cloud. For this
    | reason, you may specify a default "cloud" driver here. This driver
    | will be bound as the Cloud disk implementation in the container.
    |
    */

    'cloud' => env('FILESYSTEM_CLOUD', 's3'),

    /*
    |--------------------------------------------------------------------------
    | Filesystem Disks
    |--------------------------------------------------------------------------
    |
    | Here you may configure as many filesystem "disks" as you wish, and you
    | may even configure multiple disks of the same driver. Defaults have
    | been setup for each driver as an example of the required options.
    |
    | Supported Drivers: "local", "ftp", "sftp", "s3", "rackspace"
    |
    */

    'disks' => [

        'local' => [
            'driver' => 'local',
            'root' => storage_path('app'),
        ],

        'public' => [
            'driver' => 'local',
            'root' => storage_path('app/public'),
            'url' => env('APP_URL') . '/storage',
            'visibility' => 'public',
        ],

        'docs' => [
            'driver' => 'local',
            'root' => public_path('files'),
        ],

        'xmls' => [
            'driver' => 'local',
            'root' => storage_path('app/xmls'),
        ],

        'xmls_gas' => [
            'driver' => 'local',
            'root' => storage_path('app/xmls_gas'),
        ],

        'files' => [
            'driver' => 'local',
            'root' => storage_path('app/files'),
        ],

        'gas_files' => [
            'driver' => 'local',
            'root' => storage_path('app/gas_files'),
        ],

        'tempdir' => [
            'driver' => 'local',
            'root' => storage_path('app/tempdir'),
        ],

        'providers' => [
            'driver' => 'local',
            'root' => storage_path('app/providers'),
        ],

        'response_queue' => [
            'driver' => 'local',
            'root' => storage_path('app/response_queue'),
        ],

        'tempSplitRequestZip' => [
            'driver' => 'local',
            'root' => storage_path('app/tempSplitRequestZip'),
        ],

        'zip_request_queue' => [
            'driver' => 'local',
            'root' => storage_path('app/zip_request_queue'),
        ],

        's3' => [
            'driver' => 's3',
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION'),
            'bucket' => env('AWS_BUCKET'),
            'url' => env('AWS_URL'),
        ],

        'sftp-call-centers' => [
            'driver' => 'sftp',
            'host' => env('SFTP_INSERIMOS_HOST'),
            'username' => env('SFTP_INSERIMOS_USER'),
            'password' => env('SFTP_INSERIMOS_PASS'),
            'port' => env('SFTP_INSERIMOS_PORT'),
            'root' => 'ftp'
        ],

        'contracts' => [
            'driver' => env('SFTP_INSERIMOS_FILES_DRIVER', 'local'),
            'host' => env('SFTP_INSERIMOS_HOST'),
            'username' => env('SFTP_INSERIMOS_USER'),
            'password' => env('SFTP_INSERIMOS_PASS'),
            'port' => env('SFTP_INSERIMOS_PORT'),
            'root' => env('SFTP_INSERIMOS_CONTRACT_FILES_ROOT_PATH', storage_path('app/xmls'))
        ],

        'gas_contracts' => [
            'driver' => env('SFTP_INSERIMOS_FILES_DRIVER', 'local'),
            'host' => env('SFTP_INSERIMOS_HOST'),
            'username' => env('SFTP_INSERIMOS_USER'),
            'password' => env('SFTP_INSERIMOS_PASS'),
            'port' => env('SFTP_INSERIMOS_PORT'),
            'root' => env('SFTP_INSERIMOS_CONTRACT_FILES_ROOT_PATH', storage_path('app/xmls_gas'))
        ],

    ],
];
