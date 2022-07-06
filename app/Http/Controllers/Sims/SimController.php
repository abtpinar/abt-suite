<?php namespace App\Http\Controllers\Sims;

use App\Data\Repositories\Contracts\SimsRepository;
use App\Data\Transformers\SimTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\Sims\AddSim\AddSim;
use App\Jobs\Sims\EditSim\EditSim;
use App\Jobs\Sims\DeleteSim\DeleteSim;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class SimController extends Controller
{

    public function index(Manager $manager, SimTransformer $transformer, SimsRepository $repository)
    {
        $results = $repository->findSims();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function store()
    {
        return $this->dispatch(AddSim::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditSim::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteSim::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
