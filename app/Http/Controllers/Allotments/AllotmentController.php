<?php

namespace App\Http\Controllers\Allotments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use League\Fractal\Manager;
use App\Data\Transformers\AllotmentTransformer;
use App\Data\Repositories\Contracts\AllotmentsRepository;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use App\Jobs\Allotments\AddAllotment\AddAllotment;
use App\Jobs\Allotments\ShowAllotment\ShowAllotment;
use App\Jobs\Allotments\EditAllotment\EditAllotment;
use App\Jobs\Allotments\DeleteAllotment\DeleteAllotment;

class AllotmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Manager $manager, AllotmentTransformer $transformer, AllotmentsRepository $repository)
    {
        $results = $repository->findAllotments();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([
            'farms'
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
        return $this->dispatch(AddAllotment::class, [ValidatorBus::class]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job = app(ShowAllotment::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]); 
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update()
    {
        return $this->dispatch(EditAllotment::class, [ValidatorBus::class]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $job = app(DeleteAllotment::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
