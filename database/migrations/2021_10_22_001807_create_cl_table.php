<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Support\Enums;

class CreateClTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cl', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('farmer_id');
            $table->string('farmer_code');
            $table->string('farmer_name');
            $table->integer('unit_id');
            $table->string('unit_name');
            $table->string('tobacco_type', 1);
            $table->integer('family_id');
            $table->string('family_name');
            $table->double('amount', 10, 2);
            $table->enum('status', Enums::CL_STATES)->default(Enums::CL_STATES[0]);
            $table->double('expense', 10, 2)->default(0);
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
        Schema::dropIfExists('cl');
    }
}
