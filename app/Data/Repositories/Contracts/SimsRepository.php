<?php

namespace App\Data\Repositories\Contracts;

interface SimsRepository extends AbstractRepository
{
    public function findSims();
}
