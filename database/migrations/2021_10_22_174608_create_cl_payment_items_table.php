<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClPaymentItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cl_payment_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cl_id')->unsigned()->index();
            $table->foreign('cl_id', 'fk_cl')->references('id')->on('cl');
            $table->integer('cl_payment_id')->unsigned()->index();
            $table->foreign('cl_payment_id', 'fk_cl_payment')->references('id')->on('cl_payments');
            $table->double('amount', 10, 2);
            $table->double('initial_amount', 10, 2);
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
        Schema::dropIfExists('cl_payment_items');
    }
}
