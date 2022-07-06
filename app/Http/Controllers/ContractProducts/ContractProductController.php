<?php namespace App\Http\Controllers\ContractProducts;

use App\Http\Controllers\Controller;
use App\Jobs\ContractProducts\AddContractProduct\AddContractProduct;
use App\Jobs\ContractProducts\EditContractProduct\EditContractProduct;
use App\Jobs\ContractProducts\DeleteContractProduct\DeleteContractProduct;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ContractProductController extends Controller
{
    public function store()
    {
        return $this->dispatch(AddContractProduct::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditContractProduct::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteContractProduct::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
