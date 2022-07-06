<?php

namespace App\Data\Repositories\Contracts;

interface CoOwnersRepository extends AbstractRepository
{
    public function findCoOwners();

}