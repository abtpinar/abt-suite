<?php namespace App\Http\Controllers\MobileBrands;

use App\Data\Repositories\Contracts\MobileBrandsRepository;
use App\Data\Transformers\MobileBrandTransformer;
use App\Http\Controllers\Controller;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class MobileBrandController extends Controller
{

    public function index(Manager $manager, MobileBrandTransformer $transformer, MobileBrandsRepository $repository)
    {
        $results = $repository->findMobileBrands();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }
}
