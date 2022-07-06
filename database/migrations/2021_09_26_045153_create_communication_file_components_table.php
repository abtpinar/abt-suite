<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommunicationFileComponentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('communication_file_components', function (Blueprint $table) {
            $table->increments('id');
            $table->string('maker');
            $table->string('model');
            $table->string('properties')->nullable();
            $table->string('serial');
            $table->string('inventory')->nullable();
            $table->boolean('is_peripheral')->default(false);
            $table->boolean('is_laptop')->default(false);
            $table->integer('communication_file_id')->unsigned()->index();
            $table->foreign('communication_file_id', 'fk_communication_file')->references('id')->on('communication_files');
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
        Schema::dropIfExists('communication_file_components');
    }
}
