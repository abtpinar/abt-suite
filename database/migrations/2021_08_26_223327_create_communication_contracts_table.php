<?php

use App\Support\Enums;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCommunicationContractsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('communication_contracts', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string('version', 7);
            $table->string('origin', 25);            
            $table->enum('state', Enums::CONTRACT_STATES)->default(Enums::CONTRACT_STATES[0]);
            $table->date('activation_date');
            $table->date('expiration_date')->nullable();

            $table->integer('employee_id')->unsigned()->index();
            $table->foreign('employee_id', 'fk_employee')->references('id')->on('employees');
            $table->string('department', 2);
            $table->string('occupation', 2);

            $table->integer('sim_id')->unsigned()->index()->nullable();
            $table->foreign('sim_id', 'fk_sim')->references('id')->on('sims');
            $table->integer('call_time')->nullable();
            $table->double('sms_credit', 10, 2)->nullable();
            $table->double('data_plan', 10, 2)->nullable();

            $table->integer('mobile_id')->unsigned()->index()->nullable();
            $table->foreign('mobile_id', 'fk_mobile')->references('id')->on('mobiles');
            $table->json('mobile_accesories')->nullable();

            $table->boolean('domain_access')->default(false);
            $table->string('domain_user', 65)->nullable();
            $table->boolean('email_access')->default(false);
            $table->boolean('internet_access')->default(false);
            
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
        Schema::dropIfExists('communication_contracts');
    }
}
