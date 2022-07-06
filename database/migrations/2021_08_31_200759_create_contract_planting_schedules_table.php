<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractPlantingSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_planting_schedules', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tobacco_family', 2);
            $table->integer('month');
            $table->double('amount_p1', 10, 2);
            $table->double('amount_p2', 10, 2);
            $table->double('amount_p3', 10, 2);
            $table->integer('contract_id')->unsigned()->index();
            $table->foreign('contract_id', 'fk_contract')->references('id')->on('contracts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('contract_planting_schedules');
    }
}
