<?php

namespace App\Data\Repositories\Contracts;

interface AllotmentsRepository extends AbstractRepository
{
    public function findAllotments();

}