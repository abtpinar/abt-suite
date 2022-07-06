<?php

use App\Support\Enums;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('version', 7);
            $table->string('origin', 25);
            $table->enum('state', Enums::CONTRACT_STATES)->default(Enums::CONTRACT_STATES[0]);
            $table->date('date');
            $table->date('expiration_date');
            $table->double('planting_area', 10, 2);
            $table->double('thousands_plants', 10, 2);
            $table->double('production', 10, 2);
            $table->double('performance', 10, 2);
            $table->double('export_porcentage', 10, 2);
            $table->double('purchase_budget', 10, 2);
            $table->string('unit', 2);
            $table->integer('farmer_id')->unsigned()->index();
            $table->foreign('farmer_id', 'fk_farmer')->references('id')->on('farmers');
            $table->string('property_type', 4);
            $table->string('planting_type', 2);
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
        Schema::dropIfExists('contracts');
    }
}
