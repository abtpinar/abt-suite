<?php namespace App\Http\Controllers\Contracts;

use App\Data\Repositories\Contracts\ContractsRepository;
use App\Data\Transformers\ContractTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\Contracts\AddContract\AddContract;
use App\Jobs\Contracts\EditContract\EditContract;
use App\Jobs\Contracts\DeleteContract\DeleteContract;
use App\Jobs\Contracts\ShowContract\ShowContract;
use App\Jobs\Contracts\DownloadPdf\DownloadPdf;
use App\Jobs\Contracts\DownloadContractsValancePdf\DownloadPdf as Valance;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class ContractController extends Controller
{
    public $headings = [
        'NRO',
        'PRODUCTOR',
        'UNIDAD',
        'TIPO TABACO',
        'AREA',
        'ACOPIO',
        'RENDIMIENTO',
    ];

    public function index(Manager $manager, ContractTransformer $transformer, ContractsRepository $repository)
    {
        $results = $repository->findContracts();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([
            'farmer', 
            'contract_planting_schedules', 
            'contract_irrigation_schedules', 
            'contract_harvest_schedules',
            'contract_tobacco_class_schedules',
            'contract_products',
            'production_unit',
        ]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowContract::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddContract::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditContract::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteContract::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel(Request $request, ContractsRepository $repository)
    {
        set_time_limit(0);
        ini_set("memory_limit", "2000M");

        $contracts = $repository->recordsToExport();

        return (new ContractExport($this->headings, $contracts))->download('Contratos.xlsx');
    }

    /**
     * @param $id
     * @return mixed
     * @throws Exception
     */
    public function exportPDF($id)
    {
        return $this->dispatch(app(DownloadPdf::class, ['data' => ['id' => $id]]));
    }


    /**
     * @return mixed
     * @throws Exception
     */
    public function exportContractsValancePDF(ContractsRepository $repository)
    {
        /*return $this->initializeData($repository);exit();*/
        return $this->dispatch(app(Valance::class));
    }
}
