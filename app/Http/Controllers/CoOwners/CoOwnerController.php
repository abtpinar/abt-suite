<?php

namespace App\Http\Controllers\CoOwners;

use App\Data\Repositories\Contracts\CoOwnersRepository;
use App\Data\Transformers\CoOwnerTransformer;
use App\Jobs\CoOwners\AddCowner\AddCoOwner;
use App\Jobs\CoOwners\DeleteCoOwner\DeleteCoOwner;
use App\Jobs\CoOwners\EditCoOwner\EditCoOwner;
use App\Jobs\CoOwners\ShowCoOwner\ShowCoOwner;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class CoOwnerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Manager $manager, CoOwnerTransformer $transformer, CoOwnersRepository $repository)
    {
        $results = $repository->findCoOwners();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([
            'farms',
            'farmers'
        ]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        return $this->dispatch(AddCoOwner::class, [ValidatorBus::class]);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job = app(ShowCoOwner::class, ['data' => ['id' => $id]]);
        
        return $this->dispatch($job, [ValidatorBus::class]); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update()
    {
        return $this->dispatch(EditCoOwner::class, [ValidatorBus::class]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $job = app(DeleteCoOwner::class, ['data' => ['id' => $id]]);
            
        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
