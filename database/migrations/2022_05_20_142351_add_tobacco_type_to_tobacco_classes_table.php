<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Support\Enums;

class AddTobaccoTypeToTobaccoClassesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tobacco_classes', function (Blueprint $table) {
            $table->enum('tobacco_type', Enums::TOBACCO_TYPE)->default(Enums::TOBACCO_TYPE[0])->after('type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tobacco_classes', function (Blueprint $table) {
            $table->dropColumn('tobacco_type');
        });
    }
}
