<?php

namespace App\Data\Repositories\Contracts;

interface EmployeesRepository extends AbstractRepository
{
    public function findEmployees();
}
