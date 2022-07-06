<?php namespace App\Http\Controllers\CLPaymentItems;

use App\Data\Repositories\Contracts\CLPaymentItemsRepository;
use App\Data\Transformers\CLPaymentItemTransformer;
use App\Http\Controllers\Controller;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class CLPaymentItemController extends Controller
{
    public function index(Manager $manager, CLPaymentItemTransformer $transformer, CLPaymentItemsRepository $repository)
    {
        $results = $repository->findCLPaymentItems();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }
}
