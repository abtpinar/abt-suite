<?php

use App\Support\Enums;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRefundedStatusToClTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("ALTER TABLE cl CHANGE COLUMN status status ENUM('" . implode("', '", Enums::CL_STATES) . "')");
        DB::statement("ALTER TABLE cl ALTER status SET DEFAULT 'IMPORTED'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cl', function (Blueprint $table) {
            //
        });
    }
}
