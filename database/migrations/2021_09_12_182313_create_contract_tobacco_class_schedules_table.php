<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractTobaccoClassSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_tobacco_class_schedules', function (Blueprint $table) {
            $table->increments('id');
            $table->double('amount', 10, 2);
            $table->double('price', 10, 2);
            $table->integer('contract_id')->unsigned()->index();
            $table->foreign('contract_id', 'fk_contract_tobacco_class')->references('id')->on('contracts');
            $table->integer('tobacco_class_id')->unsigned()->index();
            $table->foreign('tobacco_class_id', 'fk_tobacco_class')->references('id')->on('tobacco_classes');
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
        Schema::dropIfExists('contract_tobacco_class_schedules');
    }
}
