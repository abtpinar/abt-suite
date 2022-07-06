<?php namespace App\Http\Controllers\CommunicationContracts;

use App\Data\Repositories\Contracts\CommunicationContractsRepository;
use App\Data\Transformers\CommunicationContractTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\CommunicationContracts\AddCommunicationContract\AddCommunicationContract;
use App\Jobs\CommunicationContracts\EditCommunicationContract\EditCommunicationContract;
use App\Jobs\CommunicationContracts\DeleteCommunicationContract\DeleteCommunicationContract;
use App\Jobs\CommunicationContracts\ShowCommunicationContract\ShowCommunicationContract;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class CommunicationContractController extends Controller
{
    public $headings = [
        'ID',
        'Versión',
        'Origen',
    ];

    public function index(Manager $manager, CommunicationContractTransformer $transformer, CommunicationContractsRepository $repository)
    {
        $results = $repository->findCommunicationContracts();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes(['employee', 'mobile_model', 'sim']);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowCommunicationContract::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddCommunicationContract::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditCommunicationContract::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteCommunicationContract::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel(Request $request, CommunicationContractsRepository $repository)
    {
        set_time_limit(0);
        ini_set("memory_limit", "2000M");

        $clients = $repository->recordsForExport();

        return (new CommunicationContractExport($this->headings, $clients))->download('Contratos.xls');
    }
}
