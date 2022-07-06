<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContractProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contract_products', function (Blueprint $table) {
            $table->increments('id');
            $table->double('amount', 10, 2);
            $table->double('price', 10, 2);
            $table->string('measurement_unit', 2);
            $table->boolean('basic');
            $table->integer('contract_id')->unsigned()->index();
            $table->foreign('contract_id', 'fk_contract_product')->references('id')->on('contracts');
            $table->integer('product_id')->unsigned()->index();
            $table->foreign('product_id', 'fk_product')->references('id')->on('products');
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
        Schema::dropIfExists('contract_products');
    }
}
