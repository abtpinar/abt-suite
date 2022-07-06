<?php

namespace App\Data\Repositories\Contracts;

interface CLsRepository extends AbstractRepository
{
    public function findCLs();
    public function findUnits();
    public function recordsToExport();
    public function findByFarmer($farmer_id, $type);
    public function findByUnit($unit_id);
    public function getOverview();
}
