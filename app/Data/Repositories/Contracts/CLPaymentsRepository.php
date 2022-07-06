<?php

namespace App\Data\Repositories\Contracts;

interface CLPaymentsRepository extends AbstractRepository
{
    public function findCLPayments();
    public function recordsToExport();
}
