<?php

namespace App\Data\Repositories\Contracts;

interface FarmersRepository extends AbstractRepository
{
    public function findFarmers();
}
