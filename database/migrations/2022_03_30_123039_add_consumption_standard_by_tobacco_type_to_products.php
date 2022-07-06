<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddConsumptionStandardByTobaccoTypeToProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->double('consumption_standard_tp', '10', '2')->after('expense_concept');
            $table->double('consumption_standard_v1', '10', '2')->after('expense_concept');
            $table->double('consumption_standard_v2', '10', '2')->after('expense_concept');
            $table->double('consumption_standard_sp', '10', '2')->after('expense_concept');
            $table->double('consumption_standard_by', '10', '2')->after('expense_concept');
            $table->double('consumption_standard_vg', '10', '2')->after('expense_concept');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(
                [
                    'consumption_standard_tp',
                    'consumption_standard_v1',
                    'consumption_standard_v2',
                    'consumption_standard_sp',
                    'consumption_standard_by',
                    'consumption_standard_vg'
                ]);
        });
    }
}
