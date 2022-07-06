<?php namespace App\Http\Controllers\ContractPlantingSchedules;

use App\Http\Controllers\Controller;
use App\Jobs\ContractPlantingSchedules\AddContractPlantingSchedule\AddContractPlantingSchedule;
use App\Jobs\ContractPlantingSchedules\EditContractPlantingSchedule\EditContractPlantingSchedule;
use App\Jobs\ContractPlantingSchedules\DeleteContractPlantingSchedule\DeleteContractPlantingSchedule;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ContractPlantingScheduleController extends Controller
{
    public function store()
    {
        return $this->dispatch(AddContractPlantingSchedule::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditContractPlantingSchedule::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteContractPlantingSchedule::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
