<?php namespace App\Http\Controllers\MobileModels;

use App\Data\Repositories\Contracts\MobileModelsRepository;
use App\Data\Transformers\MobileModelTransformer;
use App\Http\Controllers\Controller;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class MobileModelController extends Controller
{

    public function index(Manager $manager, MobileModelTransformer $transformer, MobileModelsRepository $repository)
    {
        $results = $repository->findMobileModels();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }
}
