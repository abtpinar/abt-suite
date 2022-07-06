<?php

use App\Support\Bus\DispatcherTrait;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use DispatcherTrait;

    public function run()
    {
        $this->call(UsersTableSeeder::class);
    }
}
