<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFarmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('farms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('record_number', '150');
            $table->date('activation_date');
            $table->date('expiration_date');
            $table->string('coordinates', '125');
            $table->string('version', '7');
            $table->string('origin', '25');
            $table->string('ground_feature_code', '2');
            $table->string('possesion_type_code', '2');
            $table->integer('farmer_id', false, true)->index();
            
            $table->foreign('farmer_id', 'fk_farms_farmers')->references('id')->on('farmers');
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
        Schema::dropIfExists('farms');
    }
}
