<?php namespace App\Http\Controllers\Users;

use App\Data\Entities\User;
use App\Data\Repositories\Contracts\UsersRepository;
use App\Data\Transformers\UserTransformer;
use App\Http\Controllers\Controller;
use App\Jobs\Users\ActivateUser\ActivateUser;
use App\Jobs\Users\AddUser\AddUser;
use App\Jobs\Users\DesactivateUser\DesactivateUser;
use App\Jobs\Users\EditProfile\EditProfile;
use App\Jobs\Users\EditUser\DeleteUser;
use App\Jobs\Users\EditUser\EditUser;
use App\Jobs\Users\EnableUser\EnableUser;
use App\Jobs\Users\ShowUser\ShowUser;
use App\Jobs\Users\UpdatePassword\UpdatePassword;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Http\Request;
use League\Fractal\Manager;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;
use League\Fractal\Resource\Collection;

class UserController extends Controller
{
    public function index(Manager $manager, UserTransformer $transformer, UsersRepository $usersRepository)
    {
        $users = $usersRepository->findUsers();
        $collection = new Collection($users->items(), $transformer);
        $collection->setPaginator(new IlluminatePaginatorAdapter($users));
        $manager->parseIncludes(["roles"]);
        $resourceCollection = $manager->createData($collection);

        return $this->apiOkResponse($resourceCollection->toArray());
    }

    public function store()
    {
        return $this->dispatch(AddUser::class, [ValidatorBus::class]);
    }

    public function update()
    {
        return $this->dispatch(EditUser::class, [ValidatorBus::class]);
    }

    public function destroy($id)
    {
        $job = app(DeleteUser::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function show($id)
    {
        $job = app(ShowUser::class, ["data" => ["id" => $id]]);

        return $this->dispatch($job, [ValidatorBus::class]);
    }

    public function activate()
    {
        return $this->dispatch(ActivateUser::class, [ValidatorBus::class]);
    }

    public function desactivate()
    {
        return $this->dispatch(DesactivateUser::class, [ValidatorBus::class]);
    }

    public function enable()
    {
        return $this->dispatch(EnableUser::class, [ValidatorBus::class]);
    }

    public function profile()
    {
        return $this->dispatch(EditProfile::class, [ValidatorBus::class]);
    }

    public function getAll()
    {
        $users = User::all();
        foreach ($users as $user) {
            $user->roles = $user->roles;
        }
        return $this->apiOkResponse($users);
    }

    public function getUATEnv()
    {
        return $this->apiOkResponse(env('UAT'));
    }

    public function updatePassword(Request $request)
    {
        $job = app(
            UpdatePassword::class,
            [
                'data' => $request->all()
            ]
        );
        return $this->dispatch($job);
    }

    public function getUserById($userId, UsersRepository $usersRepository)
    {
        $userResult = $usersRepository->findUserById($userId);
        return $this->apiOkResponse($userResult);
    }
}
