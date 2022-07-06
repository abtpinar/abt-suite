<?php

namespace App\Data\Repositories\Contracts;

interface ProductionUnitsRepository extends AbstractRepository
{
    public function findProductionUnits();
}
