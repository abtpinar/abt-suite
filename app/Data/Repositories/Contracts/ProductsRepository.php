<?php

namespace App\Data\Repositories\Contracts;

interface ProductsRepository extends AbstractRepository
{
    public function findProducts();
    public function recordsForExport();
    public function findProductsBE();
    /*public function findProductsOE();
    public function findProdcuctSE();*/
}
