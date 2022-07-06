<?php

namespace App\Data\Repositories\Contracts;

interface RolesRepository extends AbstractRepository
{
    public function findRoles();
}