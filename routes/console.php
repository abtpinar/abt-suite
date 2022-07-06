<?php

Artisan::command('correct-names', function () {

    $records = \App\Data\Entities\Farmer::query()->get();

    foreach ($records as $record) {
        if ($record->middle_name == 'no tiene') {

            $segmentedName = explode(' ', trim($record->first_name));
            $newSegmentedName = [];
            foreach ($segmentedName as $key => $value) {
                if (!empty(trim($value))) {
                  $newSegmentedName[] = $value;
                }
            }

            if (count($newSegmentedName) == 2) {
                $record->first_name = $newSegmentedName[0];
                $record->middle_name = $newSegmentedName[1];
                $record->last_name = '.';
            } else {
                $record->first_name = $newSegmentedName[0];
                $record->middle_name = $newSegmentedName[count($newSegmentedName) - 2];
                $record->last_name = $newSegmentedName[count($newSegmentedName) - 1];
            }

            $record->save();
        }
    }

    $this->info('done!');
});

Artisan::command('list-periods', function () {

    $query = \Illuminate\Support\Facades\DB::connection('pgsql')->table('productor');
    $query = $query->join('mandato_tapado', function ($join) {
        $join->on('productor.id', '=', 'mandato_tapado.productor_id')->where('mandato_tapado.cosecha_id', '=', '7');
    });
    $query = $query->join('mandato_tapado_clase', 'mandato_tapado.id', '=', 'mandato_tapado_clase.mandato_tapado_id');
    $query = $query->join('clase', function ($join) {
        $join->on('mandato_tapado_clase.clase_id', '=', 'clase.id')->where('clase.tipo', '=', 'exportacion');
    });
    $query = $query->join('cosecha_clase', function ($join) {
        $join->on('clase.id', '=', 'cosecha_clase.clase_id')->where('cosecha_clase.cosecha_id', '=', '7');
    });
    $query = $query->select(
        'productor.id', 'productor.nombre', 'productor.unidad_produccion_id', 
        'mandato_tapado.variedad_id', 
        'mandato_tapado_clase.clase_id', 
        \Illuminate\Support\Facades\DB::raw("sum(mandato_tapado_clase.mhojas_cc + mandato_tapado_clase.mhojas_cn) as mh"), 
        'cosecha_clase.precio_unidad_hoja as puh',
        'clase.nombre as clase'
    );
    $query = $query->groupBy('productor.id', 'mandato_tapado.variedad_id', 'mandato_tapado_clase.clase_id', 'puh', 'clase');
    $query = $query->orderBy('productor.nombre');
    $query = $query->orderBy('mandato_tapado.variedad_id');
    $records = $query->get();

    $id = '0';
    foreach ($records as $record) {
        if ($id != $record->id . $record->variedad_id) {
            $id = $record->id . $record->variedad_id;
            $value = 0;
            foreach ($records as $record2) {
                if ($record->id . $record->variedad_id == $record2->id . $record2->variedad_id)
                    $value = $value + round($record2->mh * round($record2->puh, 4), 2);
            }
            $this->info($record->nombre . ', ' . number_format($value, 2));
        }        
    }

    $this->info('done!');
});



Artisan::command('list', function () {

    $query = \Illuminate\Support\Facades\DB::connection('pgsql')->table('productor');
    $query = $query->join('mandato_sol', 'productor.id', '=', 'mandato_sol.productor_id');
    $query = $query->join('mandato', function ($join) {
        $join->on('mandato_sol.mandato_id', '=', 'mandato.id')->where('mandato.cosecha_id', '=', '7');
    });
    $query = $query->select(
        \Illuminate\Support\Facades\DB::raw("distinct(productor.id, mandato_sol.variedad_id) as uni"), 
        'productor.id as pid', 'productor.nombre as pnom', 'mandato_sol.*'
    );
    $query = $query->orderBy('productor.nombre');
    $query = $query->orderBy('mandato_sol.variedad_id');
    $records = $query->get();

    $query2 = \Illuminate\Support\Facades\DB::connection('pgsql')->table('cosecha_escala');
    $query2 = $query2->where('cosecha_escala.cosecha_id', '=', '7');
    $query2 = $query2->where('cosecha_escala.escala_id', '=', '3');

    $ces = $query2->orderBy('cosecha_escala.indice')->get();
    $escala = [];
    foreach ($ces as $ce) {
        $escala[$ce->indice] = $ce->valor;
    }

    $this->info(json_encode($escala));
    $this->info('');

    $precio_maximo = $escala[80];
    $precio_minimo = $escala[0];

    $count = 0;
    foreach ($records as $record) {
        $count++;
        if ($record->pid == '752') {
            $data = [];

            $data['mananita']['acopio'] = $record->acopio_mannanita;
            $data['mananita']['muestra'] = $record->muestra_mannanita;
            $data['mananita']['muestra_alta'] = $record->muestra_alta_mannanita;
            $data['mananita']['afectado'] = $record->afectado_mannanita;
            $data['mananita']['muestra-afectado'] = $data['mananita']['muestra'] - $data['mananita']['afectado'];

            $data['libre_pie']['acopio'] = $record->acopio_libra_pie;
            $data['libre_pie']['muestra'] = $record->muestra_libra_pie;
            $data['libre_pie']['muestra_alta'] = $record->muestra_alta_libra_pie;
            $data['libre_pie']['afectado'] = $record->afectado_libra_pie;
            $data['libre_pie']['muestra-afectado'] = $data['libre_pie']['muestra'] - $data['libre_pie']['afectado'];

            $data['capadura']['acopio'] = $record->acopio_capadura;
            $data['capadura']['muestra'] = $record->muestra_capadura;
            $data['capadura']['muestra_alta'] = $record->muestra_alta_capadura;
            $data['capadura']['afectado'] = $record->afectado_capadura;
            $data['capadura']['muestra-afectado'] = $data['capadura']['muestra'] - $data['capadura']['afectado'];

            $data['centro_corona']['acopio'] = $record->acopio_uno_medio + $record->acopio_centro_fino + $record->acopio_centro_gordo + $record->acopio_corona;
            $data['centro_corona']['muestra_alta'] = $record->muestra_alta_uno_medio + $record->muestra_alta_centro_fino + $record->muestra_alta_centro_gordo + $record->muestra_alta_corona;
            $data['centro_corona']['muestra'] = $record->muestra_uno_medio + $record->muestra_centro_fino + $record->muestra_centro_gordo + $record->muestra_corona;
            $data['centro_corona']['afectado'] = $record->afectado_uno_medio + $record->afectado_centro_fino + $record->afectado_centro_gordo + $record->afectado_corona;
            $data['centro_corona']['muestra-afectado'] = $data['centro_corona']['muestra'] - $data['centro_corona']['afectado'];

            $data['mananita']['calidad'] = $data['mananita']['muestra-afectado'] > 0 ? round($data['mananita']['muestra_alta'] / round($data['mananita']['muestra-afectado'], 2) * 100, 0) : 0;
            $data['libre_pie']['calidad'] = $data['libre_pie']['muestra-afectado'] > 0 ? round($data['libre_pie']['muestra_alta'] / round($data['libre_pie']['muestra-afectado'], 2) * 100, 0) : 0;
            $data['capadura']['calidad'] = $data['capadura']['muestra-afectado'] > 0 ? round($data['capadura']['muestra_alta'] / round($data['capadura']['muestra-afectado'], 2) * 100, 0) : 0;
            $data['centro_corona']['calidad'] = $data['centro_corona']['muestra-afectado'] > 0 ? round($data['centro_corona']['muestra_alta'] / round($data['centro_corona']['muestra-afectado'], 2) * 100, 0) : 0;

            $data['mananita']['precio'] = $precio_maximo;
            $data['libre_pie']['precio'] = $precio_maximo;
            $data['capadura']['precio'] = $precio_maximo;
            $data['centro_corona']['precio'] = $precio_maximo;
    
            $data['mananita']['precio_minimo'] = $precio_minimo;
            $data['libre_pie']['precio_minimo'] = $precio_minimo;
            $data['capadura']['precio_minimo'] = $precio_minimo;
            $data['centro_corona']['precio_minimo'] = $precio_minimo;
    
            $data['mananita']['precio'] = $data['mananita']['calidad'] >= 0 && $data['mananita']['calidad'] <= 80 ? $escala[$data['mananita']['calidad']] : $data['mananita']['precio'];
            $data['libre_pie']['precio'] = $data['libre_pie']['calidad'] >= 0 && $data['libre_pie']['calidad'] <= 80 ? $escala[$data['libre_pie']['calidad']] : $data['libre_pie']['precio'];
            $data['capadura']['precio'] = $data['capadura']['calidad'] >= 0 && $data['capadura']['calidad'] <= 80 ? $escala[$data['capadura']['calidad']] : $data['capadura']['precio'];
            $data['centro_corona']['precio'] = $data['centro_corona']['calidad'] >= 0 && $data['centro_corona']['calidad'] <= 80 ? $escala[$data['centro_corona']['calidad']] : $data['centro_corona']['precio'];
    
            $data['mananita']['afectado_precio_minimo_peso'] = 0;
            $data['libre_pie']['afectado_precio_minimo_peso'] = 0;
            $data['capadura']['afectado_precio_minimo_peso'] = 0;
            $data['centro_corona']['afectado_precio_minimo_peso'] = 0;

            if ($data['mananita']['muestra'] > 0)
                $data['mananita']['afectado_precio_minimo_peso'] = round(round($data['mananita']['afectado'] / $data['mananita']['muestra'] * 100, 2) * $data['mananita']['acopio'] / 100, 2);
            if ($data['libre_pie']['muestra'] > 0)
                $data['libre_pie']['afectado_precio_minimo_peso'] = round(round($data['libre_pie']['afectado'] / $data['libre_pie']['muestra'] * 100, 2) * $data['libre_pie']['acopio'] / 100, 2);
            if ($data['capadura']['muestra'] > 0)
                $data['capadura']['afectado_precio_minimo_peso'] = round(round($data['capadura']['afectado'] / $data['capadura']['muestra'] * 100, 2) * $data['capadura']['acopio'] / 100, 2);
            if ($data['centro_corona']['muestra'] > 0)
                $data['centro_corona']['afectado_precio_minimo_peso'] = round(round($data['centro_corona']['afectado'] / $data['centro_corona']['muestra'] * 100, 2) * $data['centro_corona']['acopio'] / 100, 2);

            $data['mananita']['sin_descuento_peso'] = round($data['mananita']['acopio'] - $data['mananita']['afectado_precio_minimo_peso'], 2);
            $data['libre_pie']['sin_descuento_peso'] = round($data['libre_pie']['acopio'] - $data['libre_pie']['afectado_precio_minimo_peso'], 2);
            $data['capadura']['sin_descuento_peso'] = round($data['capadura']['acopio'] - $data['capadura']['afectado_precio_minimo_peso'], 2);
            $data['centro_corona']['sin_descuento_peso'] = round($data['centro_corona']['acopio'] - $data['centro_corona']['afectado_precio_minimo_peso'], 2);

            $data['mananita']['sin_descuento'] = $data['mananita']['sin_descuento_peso'] * $data['mananita']['precio'];
            $data['libre_pie']['sin_descuento'] = $data['libre_pie']['sin_descuento_peso'] * $data['libre_pie']['precio'];
            $data['capadura']['sin_descuento'] = $data['capadura']['sin_descuento_peso'] * $data['capadura']['precio'];
            $data['centro_corona']['sin_descuento'] = $data['centro_corona']['sin_descuento_peso'] * $data['centro_corona']['precio'];

            $this->info(json_encode($data['mananita']));
            $this->info(json_encode($data['libre_pie']));
            $this->info(json_encode($data['capadura']));
            $this->info(json_encode($data['centro_corona']));
    
            // $data['mananita']['afectado_precio_minimo'] = $data['mananita']['precio_minimo'] * $data['mananita']['afectado_precio_minimo_peso'];
            // $data['libre_pie']['afectado_precio_minimo'] = $data['libre_pie']['precio_minimo'] * $data['libre_pie']['afectado_precio_minimo_peso'];
            // $data['capadura']['afectado_precio_minimo'] = $data['capadura']['precio_minimo'] * $data['capadura']['afectado_precio_minimo_peso'];
            // $data['centro_corona']['afectado_precio_minimo'] = $data['centro_corona']['precio_minimo'] * $data['centro_corona']['afectado_precio_minimo_peso'];
    
            // $data['mananita']['total'] = $data['mananita']['sin_descuento'] + $data['mananita']['afectado_precio_minimo'];
            // $data['libre_pie']['total'] = $data['libre_pie']['sin_descuento'] + $data['libre_pie']['afectado_precio_minimo'];
            // $data['capadura']['total'] = $data['capadura']['sin_descuento'] + $data['capadura']['afectado_precio_minimo'];
            // $data['centro_corona']['total'] = $data['centro_corona']['sin_descuento'] + $data['centro_corona']['afectado_precio_minimo'];

            $sin_descuento = 0;
            $sin_descuento += $data['mananita']['sin_descuento'];
            $sin_descuento += $data['libre_pie']['sin_descuento'];
            $sin_descuento += $data['capadura']['sin_descuento'];
            $sin_descuento += $data['centro_corona']['sin_descuento'];

            $this->info($record->pnom . ', ' . $sin_descuento);
            $this->info('');
        }
            
    }

    $this->info($count);
    $this->info('done!');
});
