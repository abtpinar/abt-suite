<?php
/**
 * Created by PhpStorm.
 * User: developer
 * Date: 24/05/22
 * Time: 10:41
 */

namespace App\Data\Repositories\Implementations;


use App\Data\Entities\AbstractEntity;
use App\Data\Entities\TobaccoPrice;
use App\Data\Repositories\Contracts\TobaccoPriceRepository as RepositoryInterface;

class TobaccoPriceRepository extends AbstractRepository implements RepositoryInterface
{
    /**
     * @var TobaccoPrice
     *
     */
    private $entity;

    /**
     * TobacoPriceRepository constructor.
     * @param TobaccoPrice $entity
     */
    public function __construct(TobaccoPrice $entity)
    {
        $this->entity = $entity;
    }


    /**
     * Get the Repository Entity
     * @return AbstractEntity
     */
    public function getEntity()
    {
        return $this->entity;
    }

    /**
     * Set the Repository Entity
     * @param $entity
     * @return mixed
     */
    public function setEntity(AbstractEntity $entity)
    {
        $this->entity = $entity;
    }
}