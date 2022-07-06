<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateUnitFieldOnContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn('unit');
            $table->integer('production_unit_id')->unsigned()->index()->after('farmer_id');
            $table->foreign('production_unit_id', 'fk_contract_production_unit')->references('id')->on('production_units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('contracts', function (Blueprint $table) {
            $table->dropColumn('production_unit_id');
            $table->string('unit', 2);
        });
    }
}
