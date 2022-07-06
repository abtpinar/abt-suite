<?php namespace App\Http\Controllers\CLs;

use App\Data\Repositories\Contracts\CLsRepository;
use App\Data\Transformers\CLTransformer;
use App\Http\Controllers\Controller;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;
use App\Jobs\CLs\SipacCL\SipacCL;
use App\Jobs\CLs\EditCL\EditCL;
use App\Jobs\CLs\ProcessCL\ProcessCL;
use Illuminate\Support\Facades\Input;
use App\Jobs\CLs\SetExpense\SetExpense;
use App\Jobs\CLs\SetPayment\SetPayment;
use App\Jobs\CLs\OverviewCL\OverviewCL;
use App\Jobs\CLs\DownloadPdf\DownloadPdf;
use Illuminate\Http\Response as ResponseAlias;
use Maatwebsite\Excel\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use App\Support\Bus\Decorators\Validator\ValidatorBus;

class CLController extends Controller
{
    public function index(Manager $manager, CLTransformer $transformer, CLsRepository $repository)
    {
        $results = $repository->findCLs();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes(['payments']);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function update()
    {
        return $this->dispatch(EditCL::class, [ValidatorBus::class]);
    }

    /**
     * @return JsonResponse
     */
    public function processCLs()
    {
        set_time_limit(0);
        ini_set('memory_limit', '2000M');

        if (!Input::get('ids'))
            return response()->json(['error' => 'Missing cl ids to process'], 400);

        $ids = explode(',', Input::get('ids'));

        $processed = [];
        foreach ($ids as $id) {
            $result = $this->dispatch((app(ProcessCL::class, ['data' => ['id' => $id]])));
            if ($result)
                $processed[] = $id;
        }

        return $this->apiOkResponse(['data' => $processed]);
    }
    
    public function setExpense()
    {
        return $this->dispatch(SetExpense::class);
    }
    
    public function setPayment()
    {
        return $this->dispatch(SetPayment::class);
    }
    
    public function updateFromSIPAC()
    {
        $this->dispatch(SipacCL::class);

        return $this->apiOkResponse('good job!');
    }

    public function getUnits(Manager $manager, CLTransformer $transformer, CLsRepository $repository)
    {
        $results = $repository->findUnits();
        $collection = new Collection($results->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($results));
        $manager->parseIncludes([]);
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

        $results = app(CLsRepository::class)->recordsToExport();

        return (new CLExport($results))->download('CLs.xls', Excel::XLSX);
    }
    
    public function getOverview()
    {
        return $this->dispatch(OverviewCL::class);
    }

    public function exportPDF()
    {
        return $this->dispatch(app(DownloadPdf::class, ['data' => ['id' => '1']]));
    }

}
