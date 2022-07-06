<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCardFieldToClTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cl', function (Blueprint $table) {
            $table->string('credit_card', 19)->nullable()->after('farmer_name');
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
            $table->dropColumn('credit_card');
        });
    }
}
