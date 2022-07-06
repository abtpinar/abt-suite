<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AppReset extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate and Seed the Application';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if (env('APP_ENV') == 'dev') {
            $this->call('migrate:clear');
            $this->call(
                'migrate',
                [
                    '--seed' => true,
                ]
            );
            $this->call('view:clear');
            $this->call('config:clear');
            $this->call('cache:clear');
            $this->call('route:clear');
        }
    }
}
