<?php

namespace App\Http\Controllers\Farms;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Jobs\Farms\AddFarm\AddFarm;
use App\Jobs\Farms\DeleteFarm\DeleteFarm;
use App\Jobs\Farms\EditFarm\EditFarm;
use App\Jobs\Farms\ShowFarm\ShowFarm;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use League\Fractal\Manager;
use App\Data\Repositories\Contracts\FarmsRepository;
use App\Data\Transformers\FarmTransformer;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class FarmController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Manager $manager, FarmTransformer $transformer, FarmsRepository $repository)
    {
        $results = $repository->findFarms();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([
            'farmer',
            'allotments'
        ]);
        $resourceCollections = $manager->createData($collection);
        
        return $this->apiOkResponse($resourceCollections->toArray());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store()
    {
        return $this->dispatch(AddFarm::class, [ValidatorBus::class]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $job = app(ShowFarm::class, ['data' => ['id'=>$id]]);
        return $this->dispatch($job, [ValidatorBus::class]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function update()
    {
        return $this->dispatch(EditFarm::class, [ValidatorBus::class]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $job = app(DeleteFarm::class, ['data' => ['id' => $id]]);
        return  $this->dispatch($job, [ValidatorBus::class]);
    }
}
