<?php namespace App\Http\Controllers\Products;

use App\Data\Repositories\Contracts\ProductsRepository;
use App\Data\Transformers\ProductTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\Products\AddProduct\AddProduct;
use App\Jobs\Products\EditProduct\EditProduct;
use App\Jobs\Products\DeleteProduct\DeleteProduct;
use App\Jobs\Products\ExcelExport\ExcelExport;
use App\Jobs\Products\ExcelImport\ExcelImport;
use App\Jobs\Products\ShowProduct\ShowProduct;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use App\Support\Constants;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use Maatwebsite\Excel\Facades\Excel;

class ProductController extends Controller
{
    public $headings = [
        'codigo',
        'nombre',
        'categoria',
        'precio',
        'um',
        'tipo_gasto',
        'consumo_tapado',
        'consumo_vega_fina',
        'consumo_vega_segunda',
        'consumo_sol_palo',
        'consumo_burley',
        'consumo_virginia'
    ];

    public function index(Manager $manager, ProductTransformer $transformer, ProductsRepository $repository)
    {
        $results = $repository->findProducts();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowProduct::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddProduct::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditProduct::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteProduct::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel()
    {
        $job = app(ExcelExport::class, ["data" =>
            [
                'headings' => $this->headings
            ]]);
        return $this->dispatch($job, []);

    }

    public function importFromExcel(Request $request)
    {
        /*dd($request->file('products'));*/
        $job = app(ExcelImport::class, ["data" => [
            'file' => $request->file('products')
        ]]);
        return $this->dispatch($job, []);
    }
}
