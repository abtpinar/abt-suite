<?php namespace App\Http\Controllers\Farmers;

use App\Data\Repositories\Contracts\FarmersRepository;
use App\Data\Transformers\FarmerTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\Farmers\AddFarmer\AddFarmer;
use App\Jobs\Farmers\DownloadPdf\DownloadPdf;
use App\Jobs\Farmers\EditFarmer\EditFarmer;
use App\Jobs\Farmers\DeleteFarmer\DeleteFarmer;
use App\Jobs\Farmers\ShowFarmer\ShowFarmer;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class FarmerController extends Controller
{
    public $headings = [
        'ID',
        'Código Bancario',
        'Nombre',
        '1er Apellido',
        '2do Apellido'
    ];

    public function index(Manager $manager, FarmerTransformer $transformer, FarmersRepository $repository)
    {
        $results = $repository->findFarmers();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([
            'contracts',
            'production_unit',
            'farms'
        ]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowFarmer::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddFarmer::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditFarmer::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteFarmer::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel(Request $request, FarmersRepository $repository)
    {
        set_time_limit(0);
        ini_set("memory_limit", "2000M");

        $clients = $repository->recordsForExport();

        return (new FarmerExport($this->headings, $clients))->download('Productores.xls');
    }

    /**
     * @param $id
     * @return mixed
     * @throws Exception
     */
    public function exportContractsToPDF($id)
    {
        return $this->dispatch(app(DownloadPdf::class, ['data' => ['id' => $id]]));
    }
}
