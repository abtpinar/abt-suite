<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateClear extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'migrate:clear';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all tables from the database';

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
        DB::connection()->getDatabaseName();
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        $bar = $this->output->createProgressBar(count(DB::select('SHOW TABLES')));
        foreach (DB::select('SHOW TABLES') as $k => $v) {
            $table = array_values((array)$v)[0];
            DB::statement('DROP TABLE `' . $table . '`');

            $this->line("<info>Dropped:</info> $table");
            $bar->advance();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        $bar->finish();
    }
}
