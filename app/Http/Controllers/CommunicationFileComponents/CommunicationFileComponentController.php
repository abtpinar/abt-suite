<?php namespace App\Http\Controllers\CommunicationFileComponents;

use App\Http\Controllers\Controller;
use App\Jobs\CommunicationFileComponents\AddCommunicationFileComponent\AddCommunicationFileComponent;
use App\Jobs\CommunicationFileComponents\EditCommunicationFileComponent\EditCommunicationFileComponent;
use App\Jobs\CommunicationFileComponents\DeleteCommunicationFileComponent\DeleteCommunicationFileComponent;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class CommunicationFileComponentController extends Controller
{
    public function store()
    {
        return $this->dispatch(AddCommunicationFileComponent::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditCommunicationFileComponent::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteCommunicationFileComponent::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }
}
