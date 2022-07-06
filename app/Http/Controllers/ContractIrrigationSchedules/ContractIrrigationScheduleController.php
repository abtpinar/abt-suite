<?php namespace App\Http\Controllers\ContractIrrigationSchedules;

use App\Http\Controllers\Controller;
use App\Jobs\ContractIrrigationSchedules\AddContractIrrigationSchedule\AddContractIrrigationSchedule;
use App\Jobs\ContractIrrigationSchedules\EditContractIrrigationSchedule\EditContractIrrigationSchedule;
use App\Jobs\ContractIrrigationSchedules\DeleteContractIrrigationSchedule\DeleteContractIrrigationSchedule;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class ContractIrrigationScheduleController extends Controller
{
    public function store()
    {
        return $this->dispatch(AddContractIrrigationSchedule::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditContractIrrigationSchedule::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteContractIrrigationSchedule::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
