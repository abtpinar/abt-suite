<?php

namespace App\Data\Repositories\Contracts;


interface UsersRepository extends AbstractRepository
{
    public function findByPasswordChangeKey($passwordChangeKey);

    public function enableUser($passwordChangeKey, $data);

    public function findUsers();

    public function findUserById($userId);
}