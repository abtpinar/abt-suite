<?php namespace App\Http\Controllers\TobaccoClasses;

use App\Data\Repositories\Contracts\TobaccoClassesRepository;
use App\Data\Transformers\TobaccoClassTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\TobaccoClasses\AddTobaccoClass\AddTobaccoClass;
use App\Jobs\TobaccoClasses\EditTobaccoClass\EditTobaccoClass;
use App\Jobs\TobaccoClasses\DeleteTobaccoClass\DeleteTobaccoClass;
use App\Jobs\TobaccoClasses\ShowTobaccoClass\ShowTobaccoClass;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class TobaccoClassController extends Controller
{
    public $headings = [
        'ID',
        'Nombre',
    ];

    public function index(Manager $manager, TobaccoClassTransformer $transformer, TobaccoClassesRepository $repository)
    {
        $results = $repository->findTobaccoClasses();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowTobaccoClass::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddTobaccoClass::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditTobaccoClass::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteTobaccoClass::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel(Request $request, TobaccoClassesRepository $repository)
    {
        set_time_limit(0);
        ini_set("memory_limit", "2000M");

        $clients = $repository->recordsForExport();

        return (new TobaccoClassExport($this->headings, $clients))->download('TobaccoClasses.xls');
    }
}
