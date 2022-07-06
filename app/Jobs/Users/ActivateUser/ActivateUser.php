<?php

namespace App\Jobs\Users\ActivateUser;

use App\Data\Entities\User;
use App\Data\Repositories\Contracts\UsersRepository;
use App\Jobs\Job;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class ActivateUser extends Job
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
     *
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
     *
     * @return mixed
     */
    public function handle()
    {
        $this->repository->getEntity()->where('id', $this->data['id'])->update(
            [
                'active' => true,
                'password_change_key' => sha1(time()),
                'password_change_date' => Carbon::create()
            ]
        );

        try {
            $user = User::find($this->data['id']);
            // Mail::to($user->email)->send(new ActivatedUser($user, $this->data['url']));
        } catch (\Exception $e) {
            Log::error($e);
        }

        return ['status' => 'success', 'data' => 'El usuario ha sido activado satisfactoriamente.'];
    }
}
