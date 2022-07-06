<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAllotmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('allotments', function (Blueprint $table) {
            $table->increments('id');
            $table->double('area', '10', '2');
            $table->integer('number');
            $table->integer('division');
            $table->string('usage_type_code', '2');
            $table->integer('farm_id', false, true)->index();
            
            $table->foreign('farm_id', 'fk_allotment_farm')->references('id')->on('farms');
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
        Schema::dropIfExists('allotments');
    }
}
