<?php

namespace App\Data\Transformers;

use App\Data\Entities\Farm;

class FarmTransformer extends AbstractTransformer
{

    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [
        'farmer',
        'allotments',
    ];


    /**
     * Turn this item object into a generic array
     *
     * @param Farm $farm
     *
     * @return array
     */
    public function transform(Farm $farm)
    {
        return [
            'id' => $farm->id,
            'record_number' => $farm->record_number,
            'activation_date' => $farm->activation_date,
            'expiration_date' => $farm->expiration_date,
            'state' => date('Y', strtotime($farm->expiration_date)) > date('Y') ? 1 : 0,
            'total_area' => $farm->total_area,
            'coordinates' => $farm->coordinates,
            'version' => $farm->version,
            'origin' => $farm->origin,
            'ground_feature_code' => $farm->ground_feature_code,
            'possesion_type_code' => $farm->possesion_type_code,
            'possesion_type' => collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.possesion_types'))->where('code', $farm->possesion_type_code)->first(),
            'ground_feature' => collect(config('code_tables.' . env('APP_BRAND', 'tabacosj') . '.ground_features'))->where('code', $farm->ground_feature_code)->first(), 
            'farmer_id' => $farm->farmer_id,
        ];
    }

    /**
     * Include farmers
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeFarmer(Farm $farm)
    {
        $farmer = $farm->getFarmer;

        return $this->item($farmer, new FarmerTransformer);
    }

    /**
     * Include ground_features
     *
     * @return \League\Fractal\Resource\Item
     */
    public function includeAllotments(Farm $farm)
    {
        $allotments = $farm->getAllotments;

        return $this->collection($allotments, new AllotmentTransformer());
    }

}