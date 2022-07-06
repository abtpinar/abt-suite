<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RemoveFamilyFieldsFromClTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cl', function (Blueprint $table) {
            $table->dropColumn(['family_id', 'family_name']);
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
            $table->integer('family_id');
            $table->string('family_name');
        });
    }
}
