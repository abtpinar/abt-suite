<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMobileModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobile_models', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->integer('mobile_brand_id')->unsigned()->index();
            $table->foreign('mobile_brand_id', 'fk_mobile_brand')->references('id')->on('mobile_brands');
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
        Schema::dropIfExists('mobile_models');
    }
}
