<?php

namespace App\Jobs\CLs\SipacCL;

use App\Data\Repositories\Contracts\CLsRepository;
use App\Jobs\Job;
use App\Support\Constants;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\DB;

class SipacCL extends Job
{
    #region Constructor and Properties

    /**
     * @var array
     */
    public $data;

    /**
     * @var CLsRepository
     */
    private $repository;

    /**
     * Create a new job instance.
     * @param array $data
     * @param CLsRepository $repository
     */
    public function __construct(array $data, CLsRepository $repository)
    {
        $this->repository = $repository;
        $this->data = $data;
    }

    #endregion

    /**
     * Execute the job.
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        $this->handleTapado();
        $this->handleSol();
        $this->handleUnits();
    }

    private function handleUnits()
    {
        $units = $this->repository->findUnits();

        foreach ($units as $unit) 
        {
            $results = $this->repository->findByUnit($unit->unit_id);

            $kg = 0;
            $amount = 0;
            foreach ($results as $result) 
            {
                $kg += $result->kilograms;
                $amount += $result->amount;
            }

            if ($entity = $this->repository->findByFarmer($unit->unit_id, 'U')) {
                if (number_format($entity->amount, 2) != number_format($amount, 2) || number_format($entity->kilograms, 2) != number_format($kg, 2)) {
                    $entity->amount = number_format($amount, 2, '.', '');
                    $entity->kilograms = $kg;
                    $entity->status = $entity->status == 'IMPORTED' ? 'UPDATED' : $entity->status;
                    $entity->save();
                }
            } else {
                $this->repository->add([
                    'farmer_id' => $unit->unit_id,
                    'farmer_code' => $unit->unit_id,
                    'farmer_name' => $unit->unit_name,
                    'unit_id' => $unit->unit_id,
                    'unit_name' => $unit->unit_name,
                    'kilograms' => $kg,
                    'tobacco_type' => 'U',
                    'amount' => number_format($amount, 2, '.', ''),
                ],
                    false
                );
            }
        }

        
    }

    private function handleTapado()
    {
        $query = DB::connection('pgsql')->table('productor');
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
            'mandato_tapado_clase.clase_id',
            DB::raw("sum(mandato_tapado_clase.mhojas_cc + mandato_tapado_clase.mhojas_cn) as mh"),
            DB::raw("sum(mandato_tapado_clase.kg_cc + mandato_tapado_clase.kg_cn) as kg"),
            'cosecha_clase.precio_unidad_hoja as puh',
            'clase.nombre as clase',
            DB::raw("(select cosecha_productor.codigo from cosecha_productor where cosecha_productor.productor_id = productor.id and cosecha_productor.cosecha_id = 7) as codigo"),
            DB::raw("(select unidad_produccion.nombre from unidad_produccion where unidad_produccion.id = productor.unidad_produccion_id) as unidad_produccion")
        );
        $query = $query->groupBy('productor.id', 'mandato_tapado_clase.clase_id', 'puh', 'clase');
        $query = $query->orderBy('productor.nombre');
        $query = $query->orderBy('mandato_tapado_clase.clase_id');
        $records = $query->get();

        $id = '0';
        foreach ($records as $record) {
            if ($id != $record->id) {
                $id = $record->id;
                $value = 0;
                $kg = 0;
                foreach ($records as $record2) {
                    if ($record->id == $record2->id) {
                        $value = $value + round($record2->mh * round($record2->puh, 4), 2);
                        $kg = $kg + number_format($record2->kg, 2, '.', '');
                    }
                }

                if ($entity = $this->repository->findByFarmer($record->id, 'T')) {
                    if (number_format($entity->amount, 2) != number_format($value, 2) || number_format($entity->kilograms, 2) != number_format($kg, 2)) {
                        $entity->amount = number_format($value, 2, '.', '');
                        $entity->kilograms = $kg;
                        $entity->status = $entity->status == 'IMPORTED' ? 'UPDATED' : $entity->status;
                        $entity->save();
                    }
                } else {
                    $this->repository->add([
                        'farmer_id' => $record->id,
                        'farmer_code' => $record->codigo,
                        'farmer_name' => $record->nombre,
                        'unit_id' => $record->unidad_produccion_id,
                        'unit_name' => $record->unidad_produccion,
                        'kilograms' => $record->kg,
                        'tobacco_type' => 'T',
                        'amount' => number_format($value, 2, '.', ''),
                    ],
                        false
                    );
                }

            }
        }
    }

    private function handleSol()
    {
        $query = DB::connection('pgsql')->table('productor');
        $query = $query->join('mandato_sol', 'productor.id', '=', 'mandato_sol.productor_id');
        $query = $query->join('mandato', function ($join) {
            $join->on('mandato_sol.mandato_id', '=', 'mandato.id')->where('mandato.cosecha_id', '=', '7');
        });
        $query = $query->select(
            'productor.id as pid', 'productor.nombre as pnom', 'productor.unidad_produccion_id as pup', 'mandato_sol.*',
            DB::raw("(select cosecha_productor.codigo from cosecha_productor where cosecha_productor.productor_id = productor.id and cosecha_productor.cosecha_id = 7) as pcod"),
            DB::raw("(select unidad_produccion.nombre from unidad_produccion where unidad_produccion.id = mandato.unidad_produccion_id) as unidad_produccion")
        );
        $query = $query->orderBy('pid');
        $records = $query->get();

        $query2 = DB::connection('pgsql')->table('cosecha_escala');
        $query2 = $query2->where('cosecha_escala.cosecha_id', '=', '7');
        $query2 = $query2->where('cosecha_escala.escala_id', '=', '3');

        $ces = $query2->orderBy('cosecha_escala.indice')->get();
        $escala = [];
        foreach ($ces as $ce) {
            $escala[$ce->indice] = $ce->valor;
        }

        $precio_maximo = $escala[80];
        $precio_minimo = $escala[0];

        $id = '0';
        foreach ($records as $record) {
            if ($id != $record->pid) {
                $id = $record->pid;
                $sin_descuento_peso = 0;
                $sin_descuento = 0;
                foreach ($records as $record2) {
                    if ($id == $record2->pid) {
                        $data = [];

                        $data['mananita']['acopio'] = $record2->acopio_mannanita;
                        $data['mananita']['muestra'] = $record2->muestra_mannanita;
                        $data['mananita']['muestra_alta'] = $record2->muestra_alta_mannanita;
                        $data['mananita']['afectado'] = $record2->afectado_mannanita;
                        $data['mananita']['muestra-afectado'] = $data['mananita']['muestra'] - $data['mananita']['afectado'];

                        $data['libre_pie']['acopio'] = $record2->acopio_libra_pie;
                        $data['libre_pie']['muestra'] = $record2->muestra_libra_pie;
                        $data['libre_pie']['muestra_alta'] = $record2->muestra_alta_libra_pie;
                        $data['libre_pie']['afectado'] = $record2->afectado_libra_pie;
                        $data['libre_pie']['muestra-afectado'] = $data['libre_pie']['muestra'] - $data['libre_pie']['afectado'];

                        $data['capadura']['acopio'] = $record2->acopio_capadura;
                        $data['capadura']['muestra'] = $record2->muestra_capadura;
                        $data['capadura']['muestra_alta'] = $record2->muestra_alta_capadura;
                        $data['capadura']['afectado'] = $record2->afectado_capadura;
                        $data['capadura']['muestra-afectado'] = $data['capadura']['muestra'] - $data['capadura']['afectado'];

                        $data['centro_corona']['acopio'] = $record2->acopio_uno_medio + $record2->acopio_centro_fino + $record2->acopio_centro_gordo + $record2->acopio_corona;
                        $data['centro_corona']['muestra_alta'] = $record2->muestra_alta_uno_medio + $record2->muestra_alta_centro_fino + $record2->muestra_alta_centro_gordo + $record2->muestra_alta_corona;
                        $data['centro_corona']['muestra'] = $record2->muestra_uno_medio + $record2->muestra_centro_fino + $record2->muestra_centro_gordo + $record2->muestra_corona;
                        $data['centro_corona']['afectado'] = $record2->afectado_uno_medio + $record2->afectado_centro_fino + $record2->afectado_centro_gordo + $record2->afectado_corona;
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

                        if ($data['mananita']['muestra'] > 0 && $data['mananita']['afectado'] > 0)
                            $data['mananita']['afectado_precio_minimo_peso'] = round(round($data['mananita']['afectado'] / $data['mananita']['muestra'] * 100, 2) * $data['mananita']['acopio'] / 100, 2);
                        if ($data['libre_pie']['muestra'] > 0 && $data['libre_pie']['afectado'] > 0)
                            $data['libre_pie']['afectado_precio_minimo_peso'] = round(round($data['libre_pie']['afectado'] / $data['libre_pie']['muestra'] * 100, 2) * $data['libre_pie']['acopio'] / 100, 2);
                        if ($data['capadura']['muestra'] > 0 && $data['capadura']['afectado'] > 0)
                            $data['capadura']['afectado_precio_minimo_peso'] = round(round($data['capadura']['afectado'] / $data['capadura']['muestra'] * 100, 2) * $data['capadura']['acopio'] / 100, 2);
                        if ($data['centro_corona']['muestra'] > 0 && $data['centro_corona']['afectado'] > 0)
                            $data['centro_corona']['afectado_precio_minimo_peso'] = round(round($data['centro_corona']['afectado'] / $data['centro_corona']['muestra'] * 100, 2) * $data['centro_corona']['acopio'] / 100, 2);

                        $data['mananita']['sin_descuento_peso'] = round($data['mananita']['acopio'] - $data['mananita']['afectado_precio_minimo_peso'], 2);
                        $data['libre_pie']['sin_descuento_peso'] = round($data['libre_pie']['acopio'] - $data['libre_pie']['afectado_precio_minimo_peso'], 2);
                        $data['capadura']['sin_descuento_peso'] = round($data['capadura']['acopio'] - $data['capadura']['afectado_precio_minimo_peso'], 2);
                        $data['centro_corona']['sin_descuento_peso'] = round($data['centro_corona']['acopio'] - $data['centro_corona']['afectado_precio_minimo_peso'], 2);

                        $data['mananita']['sin_descuento'] = $data['mananita']['sin_descuento_peso'] * $data['mananita']['precio'];
                        $data['libre_pie']['sin_descuento'] = $data['libre_pie']['sin_descuento_peso'] * $data['libre_pie']['precio'];
                        $data['capadura']['sin_descuento'] = $data['capadura']['sin_descuento_peso'] * $data['capadura']['precio'];
                        $data['centro_corona']['sin_descuento'] = $data['centro_corona']['sin_descuento_peso'] * $data['centro_corona']['precio'];

                        $data['total']['muestra'] = $data['mananita']['muestra'] + $data['libre_pie']['muestra'] + $data['capadura']['muestra'] + $data['centro_corona']['muestra'];
                        $data['total']['muestra_alta'] = $data['mananita']['muestra_alta'] + $data['libre_pie']['muestra_alta'] + $data['capadura']['muestra_alta'] + $data['centro_corona']['muestra_alta'];
                        $data['total']['afectado'] = $data['mananita']['afectado'] + $data['libre_pie']['afectado'] + $data['capadura']['afectado'] + $data['centro_corona']['afectado'];
                        $data['total']['muestra-afectado'] = round($data['total']['muestra'] - $data['total']['afectado'], 2);

                        $sin_descuento_peso1 = $data['mananita']['sin_descuento_peso'] + $data['libre_pie']['sin_descuento_peso'] + $data['capadura']['sin_descuento_peso'] + $data['centro_corona']['sin_descuento_peso'];

                        $data['total']['calidad'] = 0;
                        if ($data['total']['muestra-afectado'] > 0) {
                            $data['total']['calidad'] = round($data['total']['muestra_alta'] / $data['total']['muestra-afectado'] * 100, 0);
                        }

                        $sin_descuento1 = $data['mananita']['sin_descuento'] + $data['libre_pie']['sin_descuento'] + $data['capadura']['sin_descuento'] + $data['centro_corona']['sin_descuento'];
                        $sin_descuento1 = round($sin_descuento1 * $data['total']['calidad'] / 100, 2);

                        $sin_descuento_peso += $sin_descuento_peso1;
                        $sin_descuento += $sin_descuento1;
                    }
                }

                if ($entity = $this->repository->findByFarmer($record->pid, 'S')) {
                    if (number_format($entity->amount, 2) != number_format($sin_descuento, 2) || number_format($entity->kilograms, 2) != number_format($sin_descuento_peso, 2)) {
                        $entity->amount = number_format($sin_descuento, 2, '.', '');
                        $entity->kilograms = $sin_descuento_peso;
                        $entity->status = $entity->status == 'IMPORTED' ? 'UPDATED' : $entity->status;
                        $entity->save();
                    }
                } else {
                    $this->repository->add([
                        'farmer_id' => $record->pid,
                        'farmer_code' => $record->pcod,
                        'farmer_name' => $record->pnom,
                        'unit_id' => $record->pup,
                        'unit_name' => $record->unidad_produccion,
                        'kilograms' => $sin_descuento_peso,
                        'tobacco_type' => 'S',
                        'amount' => number_format($sin_descuento, 2, '.', ''),
                    ],
                        false
                    );
                }

            }
        }
    }
}
