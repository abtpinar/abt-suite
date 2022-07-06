<?php

namespace App\Data\Repositories\Contracts;

interface ContractsRepository extends AbstractRepository
{
    public function findContracts();

    public function recordsToExport();

    public function contractsValance();
}
