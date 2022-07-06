<?php

use App\Support\Enums;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cl_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->date('start_date');
            $table->enum('status', Enums::CL_PAYMENT_STATES)->default(Enums::CL_PAYMENT_STATES[0]);
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
        Schema::dropIfExists('cl_payments');
    }
}
