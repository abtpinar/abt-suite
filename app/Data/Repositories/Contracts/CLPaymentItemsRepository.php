<?php

namespace App\Data\Repositories\Contracts;

interface CLPaymentItemsRepository extends AbstractRepository
{
    public function findCLPaymentItems();
    public function recordsForExport();
}
