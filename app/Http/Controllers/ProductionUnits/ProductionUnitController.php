<?php namespace App\Http\Controllers\ProductionUnits;

use App\Data\Repositories\Contracts\ProductionUnitsRepository;
use App\Data\Transformers\ProductionUnitTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\ProductionUnits\AddProductionUnit\AddProductionUnit;
use App\Jobs\ProductionUnits\EditProductionUnit\EditProductionUnit;
use App\Jobs\ProductionUnits\DeleteProductionUnit\DeleteProductionUnit;
use App\Jobs\ProductionUnits\ShowProductionUnit\ShowProductionUnit;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class ProductionUnitController extends Controller
{
    public $headings = [
        'ID',
        'Código Bancario',
        'Nombre',
        '1er Apellido',
        '2do Apellido'
    ];

    public function index(Manager $manager, ProductionUnitTransformer $transformer, ProductionUnitsRepository $repository)
    {
        $results = $repository->findProductionUnits();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes(['contracts']);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowProductionUnit::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddProductionUnit::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditProductionUnit::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteProductionUnit::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel(Request $request, ProductionUnitsRepository $repository)
    {
        set_time_limit(0);
        ini_set("memory_limit", "2000M");

        $clients = $repository->recordsForExport();

        return (new ProductionUnitExport($this->headings, $clients))->download('Productores.xls');
    }
}
