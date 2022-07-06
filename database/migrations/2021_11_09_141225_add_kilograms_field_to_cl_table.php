<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddKilogramsFieldToClTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cl', function (Blueprint $table) {
            $table->double('kilograms', 10, 2)->nullable()->after('unit_name');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cl', function (Blueprint $table) {
            $table->dropColumn('kilograms');
        });
    }
}
