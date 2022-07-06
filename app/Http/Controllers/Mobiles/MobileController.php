<?php namespace App\Http\Controllers\Mobiles;

use App\Data\Repositories\Contracts\MobilesRepository;
use App\Data\Transformers\MobileTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\Mobiles\AddMobile\AddMobile;
use App\Jobs\Mobiles\EditMobile\EditMobile;
use App\Jobs\Mobiles\DeleteMobile\DeleteMobile;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class MobileController extends Controller
{

    public function index(Manager $manager, MobileTransformer $transformer, MobilesRepository $repository)
    {
        $results = $repository->findMobiles();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes(['mobile_model']);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function store()
    {
        return $this->dispatch(AddMobile::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditMobile::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteMobile::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
