<?php

use App\Jobs\Users\AddUser\AddUser;
use App\Support\Bus\Decorators\Validator\ValidatorBus;
use Illuminate\Database\Seeder;
use App\Data\Repositories\Contracts\RolesRepository;
use App\Data\Repositories\Contracts\UsersRepository;
use App\Support\Bus\DispatcherTrait;

class UsersTableSeeder extends Seeder
{

    use DispatcherTrait;

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(RolesRepository $rolesRepository, UsersRepository $usersRepository)
    {
        $data = [
            'key' => 'ADMINISTRATOR',
            'name' => 'Administrador del Sistema',
            'description' => 'Todos los privilegios autorizados'
        ];

        $role = $rolesRepository->add($data, false);

        
        $data2 = [
            'key' => 'COMMUNICATION_CENTER',
            'name' => 'Administrador de Comunicaciones',
            'description' => 'Todos los privilegios del modulo de comunicaciones autorizados'
        ];

        $role2 = $rolesRepository->add($data2, false);

        
        $userData = [
            "first_name" => "Administrador",
            "last_name" => "del Sistema",
            "email" => "admin@suite.cu",
            "password" => 'As123123',
            "password_confirmation" => 'As123123',
            "active" => 1,
        ];

        $job = app(AddUser::class, ["data" => $userData]);

        $this->dispatch($job, [ValidatorBus::class]);

        $user = $usersRepository->getEntity()->where('email', "admin@suite.cu")->first();

        $user->roles()->sync([ $role->id ]);

        
        $userData2 = [
            "first_name" => "Centro",
            "last_name" => "de Comunicaciones",
            "email" => "informatica@tabacosj.co.cu",
            "password" => 'As123123',
            "password_confirmation" => 'As123123',
            "active" => 1,
        ];

        $job2 = app(AddUser::class, ["data" => $userData2]);

        $this->dispatch($job2, [ValidatorBus::class]);

        $user2 = $usersRepository->getEntity()->where('email', "informatica@tabacosj.co.cu")->first();

        $user2->roles()->sync([ $role2->id ]);
    }
}
