<?php namespace App\Http\Controllers\ContractTobaccoClassSchedules;

use App\Http\Controllers\Controller;
use App\Jobs\ContractTobaccoClassSchedules\AddContractTobaccoClassSchedule\AddContractTobaccoClassSchedule;
use App\Jobs\ContractTobaccoClassSchedules\EditContractTobaccoClassSchedule\EditContractTobaccoClassSchedule;
use App\Jobs\ContractTobaccoClassSchedules\DeleteContractTobaccoClassSchedule\DeleteContractTobaccoClassSchedule;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ContractTobaccoClassScheduleController extends Controller
{
    public function store()
    {
        return $this->dispatch(AddContractTobaccoClassSchedule::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditContractTobaccoClassSchedule::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteContractTobaccoClassSchedule::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
