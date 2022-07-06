<?php

namespace App\Jobs\Users\DesactivateUser;

use App\Data\Repositories\Contracts\UsersRepository;
use App\Jobs\Job;
use Illuminate\Support\Facades\Log;

class DesactivateUser extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var UsersRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     * @param array $data
     * @param UsersRepository $repository
     */
    public function __construct(array $data, UsersRepository $repository)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    #endregion

    /**
     * Execute the job.
     * @return mixed
     */
    public function handle()
    {
        try {
            $this->repository->getEntity()->where('id', $this->data['id'])->update(
                [
                    'active' => false
                ]
            );
            //$user = User::find($this->data['id']);
            // Mail::to($user->email)->send(new ActivatedUser($user, $this->data['url']));
        } catch (\Exception $e) {
            Log::error($e);
        }

        return ['status' => 'success', 'data' => 'El usuario ha sido desactivado satisfactoriamente.'];
    }
}
