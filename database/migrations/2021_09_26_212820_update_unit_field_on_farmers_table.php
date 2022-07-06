<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUnitFieldOnFarmersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('farmers', function (Blueprint $table) {
            $table->dropColumn('unit');
            $table->integer('production_unit_id')->unsigned()->index()->after('picture');
            $table->foreign('production_unit_id', 'fk_farmer_production_unit')->references('id')->on('production_units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('farmers', function (Blueprint $table) {
            $table->dropColumn('production_unit_id');
            $table->string('unit', 2);
        });
    }
}
