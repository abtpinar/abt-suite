<?php

namespace App\Data\Repositories\Contracts;

use App\Data\Repositories\Contracts\AbstractRepository;

interface FarmsRepository extends AbstractRepository
{
public function findFarms();
}