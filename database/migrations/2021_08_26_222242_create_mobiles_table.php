<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMobilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobiles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('mac', 17);
            $table->string('imei', 25);
            $table->string('imei2', 25)->nullable();
            $table->integer('mobile_model_id')->unsigned()->index();
            $table->foreign('mobile_model_id', 'fk_mobile_model')->references('id')->on('mobile_models');
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
        Schema::dropIfExists('mobiles');
    }
}
