<?php namespace App\Http\Controllers\CommunicationFiles;

use App\Data\Repositories\Contracts\CommunicationFilesRepository;
use App\Data\Transformers\CommunicationFileTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\CommunicationFiles\AddCommunicationFile\AddCommunicationFile;
use App\Jobs\CommunicationFiles\EditCommunicationFile\EditCommunicationFile;
use App\Jobs\CommunicationFiles\DeleteCommunicationFile\DeleteCommunicationFile;
use App\Jobs\CommunicationFiles\ShowCommunicationFile\ShowCommunicationFile;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class CommunicationFileController extends Controller
{
    public $headings = [
        'ID',
        'Versión',
        'Origen',
    ];

    public function index(Manager $manager, CommunicationFileTransformer $transformer, CommunicationFilesRepository $repository)
    {
        $results = $repository->findCommunicationFiles();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes(['employee', 'mobile_model', 'sim']);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowCommunicationFile::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddCommunicationFile::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditCommunicationFile::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteCommunicationFile::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel(Request $request, CommunicationFilesRepository $repository)
    {
        set_time_limit(0);
        ini_set("memory_limit", "2000M");

        $clients = $repository->recordsForExport();

        return (new CommunicationFileExport($this->headings, $clients))->download('Contratos.xls');
    }
}
