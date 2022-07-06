<?php

namespace App\Jobs\Users\UpdatePassword;

use App\Data\Repositories\Contracts\UsersRepository;
use App\Jobs\Job;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class UpdatePassword extends Job
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
        $user = null;
        $returnToken = false;
        if (is_null($this->data['userId'])) {
            $user = Auth::user();
            $returnToken = true;
        } else {
            $user = $this->repository->find($this->data['userId']);
        }

        try {
            if (!Hash::check($this->data['oldPassword'], $user->password)) {
                return response()->json(
                    [
                        'status' => 'ERROR',
                        'messages' => ['OLD_PASSWORD_INCORRECT'],
                        'response_code' => '400'
                    ],
                    400
                );
            }

            $user->password = $this->data['password'];
            $user->save();

            if ($returnToken) {
                $token = JWTAuth::fromUser($user);
                $user->roles;
                return $this->apiOkResponse(['token' => $token, 'user' => $user]);
            } else {
                return $this->generateReturn($user, $this->data, "edit");
            }
        } catch (\Exception $e) {
            Log::error($e);
        }
    }
}
