<?php namespace App\Http\Controllers\CLPayments;

use App\Data\Repositories\Contracts\CLPaymentsRepository;
use App\Data\Transformers\CLPaymentTransformer;
use App\Http\Controllers\Controller;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use Illuminate\Http\Response as ResponseAlias;
use Maatwebsite\Excel\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class CLPaymentController extends Controller
{
    public function index(Manager $manager, CLPaymentTransformer $transformer, CLPaymentsRepository $repository)
    {
        $results = $repository->findCLPayments();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes(['cls']);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    /**
     * @return ResponseAlias|BinaryFileResponse
     */
    public function exportExcel()
    {
        set_time_limit(0);
        ini_set('memory_limit', '2000M');

        $results = app(CLPaymentsRepository::class)->recordsToExport();

        return (new CLPaymentExport($results))->download('Payment.xls', Excel::XLSX);
    }
}
