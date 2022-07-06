<?php

namespace App\Jobs\Mobiles\AddMobile;

use App\Data\Repositories\Contracts\MobilesRepository;
use App\Data\Repositories\Contracts\MobileBrandsRepository;
use App\Data\Repositories\Contracts\MobileModelsRepository;
use App\Jobs\Job;
use ReflectionException;

class AddMobile extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;
    /**
     * @var MobilesRepository
     */
    private $repository;

    /**
     * @var MobileBrandsRepository
     */
    private $brandRepository;
    /**
     * @var MobileModelsRepository
     */
    private $modelRepository;

    /**
     * Create a new job instance.
     *
     * @param array $data
     * @param MobilesRepository $repository
     */
    public function __construct(
        array $data, 
        MobilesRepository $repository, 
        MobileBrandsRepository $brandRepository,
        MobileModelsRepository $modelRepository
    )
    {
        $this->repository = $repository;
        $this->data = $data;
        $this->brandRepository = $brandRepository;
        $this->modelRepository = $modelRepository;
    }

    #endregion

    /**
     * @return array
     * @throws ReflectionException
     */
    public function handle(): array
    {
        if (isset($this->data["brand"]))
            $this->handleBrands($this->data["brand"]);
        else if (isset($this->data["model"]))
            $this->handleModels($this->data["model"], $this->data["mobile_brand_id"]);

        $entity = $this->repository->add($this->data, false);

        if (!$entity) {
            return $this->defaultDatabaseErrorResponse();
        }

        return $this->generateReturn($entity, $this->data, "add");
    }

    private function handleBrands($brandName)
    {
        $brand = $this->brandRepository->add([ "name" => $brandName ], false);
        
        if ($brand)
        {
            $this->handleModels($this->data["model"], $brand->id);
        }
    }

    private function handleModels($model_name, $brandId)
    {
        $model = $this->modelRepository->add(
            [ 
                "name" => $model_name,
                "mobile_brand_id" => $brandId
            ], 
            false
        );

        if ($model)
        {
            $this->data["mobile_model_id"] = $model->id;
        }
    }
    
}
