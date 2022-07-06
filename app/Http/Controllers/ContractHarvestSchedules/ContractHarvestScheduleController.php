<?php namespace App\Http\Controllers\ContractHarvestSchedules;

use App\Http\Controllers\Controller;
use App\Jobs\ContractHarvestSchedules\AddContractHarvestSchedule\AddContractHarvestSchedule;
use App\Jobs\ContractHarvestSchedules\EditContractHarvestSchedule\EditContractHarvestSchedule;
use App\Jobs\ContractHarvestSchedules\DeleteContractHarvestSchedule\DeleteContractHarvestSchedule;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ContractHarvestScheduleController extends Controller
{
    public function store()
    {
        return $this->dispatch(AddContractHarvestSchedule::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditContractHarvestSchedule::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteContractHarvestSchedule::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
