<?php namespace App\Http\Controllers\Employees;

use App\Data\Repositories\Contracts\EmployeesRepository;
use App\Data\Transformers\EmployeeTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\Employees\AddEmployee\AddEmployee;
use App\Jobs\Employees\EditEmployee\EditEmployee;
use App\Jobs\Employees\DeleteEmployee\DeleteEmployee;
use App\Jobs\Employees\ShowEmployee\ShowEmployee;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class EmployeeController extends Controller
{
    public $headings = [
        'ID',
        'Código Bancario',
        'Nombre',
        '1er Apellido',
        '2do Apellido'
    ];

    public function index(Manager $manager, EmployeeTransformer $transformer, EmployeesRepository $repository)
    {
        $results = $repository->findEmployees();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes(['communication_contracts']);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function show($id)
    {
        $job = app(ShowEmployee::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function store()
    {
        return $this->dispatch(AddEmployee::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditEmployee::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteEmployee::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function exportExcel(Request $request, EmployeesRepository $repository)
    {
        set_time_limit(0);
        ini_set("memory_limit", "2000M");

        $clients = $repository->recordsForExport();

        return (new EmployeeExport($this->headings, $clients))->download('Empleados.xls');
    }
}
