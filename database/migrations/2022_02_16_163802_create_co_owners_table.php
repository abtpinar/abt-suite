<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoOwnersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('co_owners', function (Blueprint $table) {
            $table->increments('id');
            $table->double('percent_owner', '4', '2');
            $table->integer('farm_id', false, true)->index();
            $table->integer('farmer_id', false, true)->index();
            
            $table->foreign('farm_id', 'fk_co_owner_farm')->references('id')->on('farms');
            $table->foreign('farmer_id', 'fk_co_owner_farmer')->references('id')->on('farmers');
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
        Schema::dropIfExists('co_owners');
    }
}
