<?php

namespace App\Console\Commands;

use App\Data\Repositories\Contracts\UsersRepository;
use Illuminate\Console\Command;

class ChangePassword extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:change_password {email}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get the has';
    private $usersRepository;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(UsersRepository $usersRepository)
    {
        parent::__construct();
        $this->usersRepository = $usersRepository;
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $email = $this->argument('email');

        if (null === $user = $this->usersRepository->getEntity()->where('email', $email)->first()) {
            throw new \InvalidArgumentException(
                "Usuario con email `$email` no fue encontrado"
            );
        }

        do {
            $continue = true;
            if (null === $password = $this->secret('Escriba el nuevo password')) {
                $this->error("Debe introducir una contraseña");
                $continue = false;
            }

            if ($continue && 8 > strlen($password)) {
                $this->error("La contraseña debe tener más de 8 caracteres");
                $continue = false;
            }
        } while (!$continue);

        do {
            $continue = true;
            if (null === $confirmPassword = $this->secret('Confirme el password')) {
                $this->error("Debe introducir una contraseña");
                $continue = false;
            }

            if ($continue && $confirmPassword !== $password) {
                $this->error("Las contraseñas no coinciden");
                $continue = false;
            }
        } while (!$continue);

        $user->password = $password;

        $user->save();

        $this->info("Constraseña actualizada");
    }
}
