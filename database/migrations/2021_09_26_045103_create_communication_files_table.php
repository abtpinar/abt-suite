<?php

use App\Support\Enums;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommunicationFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('communication_files', function (Blueprint $table) {
            $table->increments('id');
            $table->string('version', 7);
            $table->string('origin', 25);
            $table->enum('state', Enums::CONTRACT_STATES)->default(Enums::CONTRACT_STATES[0]);
            $table->date('activation_date');
            $table->integer('employee_id')->unsigned()->index();
            $table->foreign('employee_id', 'fk_file_employee')->references('id')->on('employees');
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
        Schema::dropIfExists('communication_files');
    }
}
