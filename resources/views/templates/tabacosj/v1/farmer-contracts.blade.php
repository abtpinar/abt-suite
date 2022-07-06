<style>
    table {
        font-size: 12px;
        font-family: Arial;
        width: 100%;
        page-break-inside: avoid;
    }

    .page {
        font-size: 12px;
        text-align: justify;
        font-family: Arial;
        height: 90%;
    }

    .tu {
        text-decoration: underline
    }

    li {
        line-height: normal;
    }

    /*@page {
        size: auto;
    }*/

    .footer {
        height: 10%;
        bottom: 0;
    }


</style>

<div class="page">
    <p style="text-align:center"><strong>CONTRATOS
            No. @for($i = 0; $i < count($contracts); $i ++) {{$i + 1 < count($contracts)  ? $contracts[$i]->id.', ' : $contracts[$i]->id. ' / '}} @endfor   {{date('Y')}}</strong>
    </p>

    <p><strong>De una parte:<span
                    class="tu"> La Empresa de Acopio y Beneficio del Tabaco de Pinar del Río,</span></strong>
        de nacionalidad cubana integrada al Grupo Empresarial del Tabaco de Cuba TABACUBA, del Ministerio de la
        Agricultura,
        con domicilio legal en el Km 2 y ½ Carretera a Luis Lazo, telefono
        <strong><span class="tu">48 703445</span></strong>
        inscripta en el <strong><span class="tu">Registro Mercantil Tomo IV Folio 40 Libro Hoja 33</span></strong> con
        el Código <strong><span class="tu">131.0.3872</span></strong>,
        numero de identificacion tributaria NIT <strong><span class="tu">01000113435</span></strong> que opera la moneda
        nacional en la Agencia Bancaria
        <strong><span class="tu">No. 1551</span></strong> del Banco de Creditos y Comercio <strong><span class="tu">BANDEC</span></strong>
        mediante la Cuenta Bancaria <strong><span class="tu">No. 0615521173690010</span></strong> tiulada
        <strong><span class="tu">EES EMP ACOP. BENEF. TAB Pinar del Rio</span></strong>, y posee una cuenta de capacidad
        de liquidez <strong>(CL)</strong>
        en Banco Central de Cuba con el numero <strong><span class="tu">131.03872 200</span></strong> la que tiene como
        Titular a
        <strong><span class="tu">MINAG (TABACUBA-EMP. ACOPIO TAB PINAR DEL RIO)- CL</span></strong>, representada en
        este acto por
        <strong><span class="tu">Isaac Paz Travieso</span></strong>, en su carácter de <strong><span class="tu">Director Tabaco Agricola</span></strong>
        en el ejercicio de las facultades que le han sido conferidas mediante mediante la resolucion
        <strong><span class="tu">No. 88</span></strong>de fecha <strong><span
                    class="tu">16 de Julio de 2019</span></strong> disctada por el
        <strong><span class="tu">Director General</span></strong> y que en lo sucesivo y a los efectos de este contrato
        se denomina
        <strong><span class="tu">EL COMPRADOR - VENDEDOR</span></strong>
    </p>

    <p><strong>DE OTRA PARTE: <span class="tu"> {{ $farmer->first_name }}
                &#32;{{ $farmer->middle_name }}&#32;{{ $farmer->last_name }}</span></strong>
        ciudadano cubano, mayor de edad, con número de carnet de identidad <strong><span
                    class="tu">{{$farmer->ci}}</span></strong>,
        teléfono <strong><span
                    class="tu">{{!empty($farmer->telephone_number) ? $farmer->telephone_number : '--'}}</span></strong>,
        perteneciente a <strong><span class="tu">{{$farmer->productionUnit->name}}</span></strong>,
        que posee cuenta bancaria en moneda nacional CUP
        No. <strong><span class="tu">{{!empty($farmer->cup_card) ? $farmer->cup_card : '--'}}</span></strong>,
        cuenta bancaria en MLC con número <strong><span
                    class="tu">{{!empty($farmer->mlc_card) ? $farmer->mlc_card : '--'}}</span></strong>,
        municipio y provincia Pinar del Rio, tenedor legal de <strong><span
                    class="tu">{{number_format($farms['area'], 2, '.', ',')}}</span></strong> hectáreas de tierra,
        que posee en calidad de <strong><span
                    class="tu">{{$farms['properties']}}</span></strong>, lo que acredita
        mediante la Certificación de Tenedor Inscripto
        No. <strong><span class="tu">{{$farms['records_number']}}</span></strong>,
        emitido por el Jefe del Registro de Tenencia de la Tierra del municipio Pinar del Rio, en fecha <strong><span
                    class="tu">{{$farms['date']}}</span></strong>, el que comparece en
        representación propia y en ejercicio pleno de sus derechos civiles, y que en lo sucesivo y a los efectos de este
        contrato se denominará
        <strong><span class="tu">EL VENDEDOR</span></strong>.
    </p>

    <p><strong><span class="tu">AMBAS PARTES</span></strong>, reconociéndose la personalidad jurídica y representación
        con que concurren a este acto,
        convienen suscribir el presente contrato, en los términos y condiciones siguientes:</p>

    <p><strong>PRIMERO:</strong> De las obligaciones del PRESTADOR.</p>
    <ol type="a">
        <li><p> Convenir las cifras directivas de producción con el productor de conformidad con lo
                establecido:</p></li>
    </ol>

    <table border="1" cellpadding="2" cellspacing="0" style="width: 75%; margin-left: 8%">
        <tr>
            <th rowspan="2" style="text-align: center" width="275">Producci&#243;n</th>
            <th rowspan="2" width="25">U/M</th>
            <th colspan="5" style="text-align: center">Tipo de tabaco</th>
            <th rowspan="2" style="text-align: center">Total</th>
        </tr>
        <tr>

            <th>Tapado</th>
            <th>Vega fina</th>
            <th>Vega segunda</th>
            <th>Sol palo</th>
            <th>Burley</th>
        </tr>
        <tr>
            <td>&#193;rea de siembra</td>
            <td style="text-align: center">ha</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'TP' ? number_format($contract->planting_area, 2,".",","): ''}}@endforeach</td>
            <td>@foreach($contracts as $contract){{$contract->tobacco_type == 'V1' ? number_format($contract->planting_area, 2,".",",") : ''}}@endforeach</td>
            <td>@foreach($contracts as $contract){{$contract->tobacco_type == 'V2' ? number_format($contract->planting_area, 2,".",",") : ''}}@endforeach</td>
            <td>@foreach($contracts as $contract){{$contract->tobacco_type == 'SP' ? number_format($contract->planting_area, 2,".",",") : ''}}@endforeach</td>
            <td>@foreach($contracts as $contract){{$contract->tobacco_type == 'BY' ? number_format($contract->planting_area, 2,".",",") : ''}}@endforeach</td>
            <?php
            $area = 0;
            ?>
            @foreach($contracts as $contract)
                {!! $area += $contract->planting_area !!}
            @endforeach
            <td><strong>{{number_format($area, 2,".",",")}}</strong></td>
        </tr>
        <tr>
            <td>Posturas a plantar</td>
            <td style="text-align: center">miles</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'TP' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V1' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V2' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'SP' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'BY' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}@endforeach</td>
            <?php
            $thausands_plants = 0;
            ?>
            @foreach($contracts as $contract)
                {!! $thausands_plants += $contract->thousands_plants !!}
            @endforeach
            <td><strong>{{number_format($thausands_plants, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td rowspan="2">Producci&#243;n (acopio)</td>
            <td style="text-align: center">tt</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'TP' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V1' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V2' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'SP' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'BY' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}@endforeach</td>
            <?php
            $production_tt = 0;
            ?>
            @foreach($contracts as $contract)
                {!! $production_tt += $contract->production / 21.74 !!}
            @endforeach
            <td><strong>{{number_format(round($production_tt, 2), 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td style="text-align: center">qq</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'TP' ? number_format($contract->production, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V1' ? number_format($contract->production, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V2' ? number_format($contract->production, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'SP' ? number_format($contract->production, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'BY' ? number_format($contract->production, 2, ".", ",") : ''}}@endforeach</td>
            <?php
            $production_qq = 0;
            ?>
            @foreach($contracts as $contract)
                {!! $production_qq += $contract->production  !!}
            @endforeach
            <td><strong>{{number_format($production_qq, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td>Rendimiento</td>
            <td style="text-align: center">t/ha</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'TP' ? number_format($contract->performance, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V1' ? number_format($contract->performance, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V2' ? number_format($contract->performance, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'SP' ? number_format($contract->performance, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'BY' ? number_format($contract->performance, 2, ".", ",") : ''}}@endforeach</td>

            <td><strong>{{number_format($production_tt / $area, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td rowspan="1">Capas para exportaci&#243;n (acopio)</td>
            <td style="text-align: center">&#37;</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'TP' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V1' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'V2' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'SP' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}@endforeach</td>
            <td>@foreach ($contracts as $contract){{$contract->tobacco_type == 'BY' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}@endforeach</td>
            <?php
            $export_percentage = 0;
            ?>
            @foreach($contracts as $contract)
                {!! $export_percentage += $contract->export_porcentage  !!}
            @endforeach
            <td><strong>{{number_format($export_percentage / count($contracts), 2, ".", ",")}}</strong></td>
        </tr>

        <tr>
            <td>Precio de venta</td>
            <td style="text-align: center">Mn</td>
            <td>{{isset($data['TP']) ? number_format($data['TP']['sale'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['V1']) ? number_format($data['V1']['sale'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['V2']) ? number_format($data['V2']['sale'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['SP']) ? number_format($data['SP']['sale'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['BY']) ? number_format($data['BY']['sale'], 2, ".", ",") : ''}}</td>
            <?php
            $gather = 0;
            ?>
            @foreach($data as $value)
                {!! $gather += $value['gather']  !!}
            @endforeach
            <td>
                <strong>{{number_format($gather / $production_qq, 2, '.', ',')}}</strong>
            </td>
        </tr>
        <tr>
            <td>Valor del acopio</td>
            <td style="text-align: center">Mn</td>
            <td>{{isset($data['TP']) ? number_format($data['TP']['gather'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['V1']) ? number_format($data['V1']['gather'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['V2']) ? number_format($data['V2']['gather'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['SP']) ? number_format($data['SP']['gather'], 2, ".", ",") : ''}}</td>
            <td>{{isset($data['BY']) ? number_format($data['BY']['gather'], 2, ".", ",") : ''}}</td>

            <td>
                <strong>{{number_format($gather, 2, '.', ',')}}</strong>
            </td>
        </tr>
        <tr>
            <td>Capacidad de compra</td>
            <td style="text-align: center">Mn</td>
            <td>{{isset($purchase_budget['TP']) ? number_format($purchase_budget['TP']['cup'], 2, ".", ",") : ''}}</td>
            <td>{{isset($purchase_budget['V1']) ? number_format($purchase_budget['V1']['cup'], 2, ".", ",") : ''}}</td>
            <td>{{isset($purchase_budget['V2']) ? number_format($purchase_budget['V2']['cup'], 2, ".", ",") : ''}}</td>
            <td>{{isset($purchase_budget['SP']) ? number_format($purchase_budget['SP']['cup'], 2, ".", ",") : ''}}</td>
            <td>{{isset($purchase_budget['BY']) ? number_format($purchase_budget['BY']['cup'], 2, ".", ",") : ''}}</td>
            <?php
            $budget_cup = 0;
            ?>
            @foreach($purchase_budget as $value)
                {!! $budget_cup += $value['cup']  !!}
            @endforeach
            <td><strong>{{number_format($budget_cup, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td>Capacidad de compra</td>
            <td style="text-align: center">Cl</td>
            <td>{{isset($purchase_budget['TP']) ? number_format($purchase_budget['TP']['cl'], 2, ".", ",") : ''}}</td>
            <td>{{isset($purchase_budget['V1']) ? number_format($purchase_budget['V1']['cl'], 2, ".", ",") : ''}}</td>
            <td style="background-color: #9c9c9c"></td>
            <td style="background-color: #9c9c9c"></td>
            <td>{{isset($purchase_budget['BY']) ? number_format($purchase_budget['BY']['cl'], 2, ".", ",") : ''}}</td>
            <?php
            $budget_cl = 0;
            ?>
            @foreach($purchase_budget as $value)
                {!! $budget_cl += $value['cl']  !!}
            @endforeach
            <td><strong>{{number_format($budget_cl, 2, ".", ",")}}</strong></td>


        </tr>
    </table>
</div>


{{--sign footer--}}
<div class="footer">
    <table width="100%" style="
        vertical-align: bottom;
        font-family: Arial;
        font-size: 8pt;
        font-weight: bold;
        font-style: italic"
    >
        <tr>
            <td style="text-align: center;">
                _______________________________________
            </td>
            <td style="text-align: center">

                _______________________________________

            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                <strong>Dtor Agr&iacute;cola</strong>
            </td>
            <td style="text-align: center">

                <strong>Productor</strong>

            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                <strong>Isaac Paz Travieso</strong>
            </td>
            <td style="text-align: center">
            </td>
        </tr>
    </table>
</div>
{{--/sign footer--}}
<pagebreak></pagebreak>

<div class="page">
    <p style="text-align: center"><strong>CONTRATO
            No. @for($i = 0; $i < count($contracts); $i ++) {{$i + 1 < count($contracts)  ? $contracts[$i]->id.', ' : $contracts[$i]->id. ' / '}} @endfor {{date('Y')}}
            . ANEXO 1</strong></p>
    <p><strong>CANASTA BASICA</strong></p>
    <table border="1" cellpadding="2" cellspacing="0">
        <tr>
            <th>Insumos</th>
            <th>U.M</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Importe</th>
            {{--<th>Fecha entrega</th>--}}
        </tr>
        <?php
        $total_basic = 0;
        ?>
        @foreach($basic_expenses as $key=>$val)
            {!! $total_basic +=  $val['amount'] !!}
            <tr>
                <td>{{$key}}</td>
                <td style="text-align: center">{{$val['measurment_unit']}}</td>
                <td style="text-align: right">{{number_format($val['amoun'], 2, ".", ",")}}</td>
                <td style="text-align: right">{{$val['price'] > 0 ? number_format($val['price'], 2, ".", ","): "--"}}</td>
                <td style="text-align: right">{{number_format($val['amount'], 2, ".", ",")}}</td>
            </tr>
        @endforeach
        <tr>
            <td style="text-align: center"><strong>Total</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="text-align: right"><strong>{{number_format($total_basic, 2, ".", ",")}}</strong></td>
        </tr>
    </table>
</div>

{{--sign footer--}}
<div class="footer">
    <table width="100%" style="
        vertical-align: bottom;
        font-family: Arial;
        font-size: 8pt;
        font-weight: bold;
        font-style: italic"
    >
        <tr>
            <td style="text-align: center;">
                _______________________________________
            </td>
            <td style="text-align: center">

                _______________________________________

            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                <strong>Dtor Agr&iacute;cola</strong>
            </td>
            <td style="text-align: center">

                <strong>Productor</strong>

            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                <strong>Isaac Paz Travieso</strong>
            </td>
            <td style="text-align: center">
            </td>
        </tr>
    </table>
</div>
{{--/sign footer--}}

<pagebreak></pagebreak>

<div class="page">
    <p style="text-align: center"><strong>CONTRATO
            No. @for($i = 0; $i < count($contracts); $i ++) {{$i + 1 < count($contracts)  ? $contracts[$i]->id.', ' : $contracts[$i]->id. ' / '}} @endfor {{date('Y')}}
            . ANEXO 1</strong></p>
    <p><strong>OTROS GASTOS</strong></p>
    <table border="1" cellpadding="2" cellspacing="0">
        <tr>
            <th>Insumos</th>
            <th>U.M</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Importe</th>
            {{--<th>Fecha entrega</th>--}}
        </tr>
        <?php
        $total_other = 0;
        ?>
        @foreach($other_expenses as $key=>$val)
            {!! $total_other +=  $val['amount'] !!}
            <tr>
                <td>{{$key}}</td>
                <td style="text-align: center">{{$val['measurment_unit']}}</td>
                <td style="text-align: right">{{number_format($val['amoun'], 2, ".", ",")}}</td>
                <td style="text-align: right">{{$val['price'] > 0 ? number_format($val['price'], 2, ".", ","): "--"}}</td>
                <td style="text-align: right">{{number_format($val['amount'], 2, ".", ",")}}</td>
            </tr>
        @endforeach
        <tr>
            <td style="text-align: center"><strong>Total</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="text-align: right"><strong>{{number_format($total_other, 2, ".", ",")}}</strong></td>
        </tr>
    </table>

    <p style="text-align: center"><strong>ANEXOS (3, 4, 5)</strong></p>
    <p><strong>CRONOGRAMA DE RIEGA DE SEMILLERO TABACO. UM/ Canteros.</strong></p>
    <table border="1" cellpadding="2" cellspacing="0">
        <tr>
            <th rowspan="2">Tipo de tabaco</th>
            <th rowspan="2">Variedad</th>
            <th rowspan="2" width="25">Total general</th>
            <th colspan="3">Agosto</th>
            <th colspan="3">Septiemre</th>
            <th colspan="3">Octubre</th>
            <th colspan="3">Noviembre</th>
        </tr>
        <tr>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
        </tr>
        @foreach($contracts as $contract)
            @foreach($contract->irrigationSchedules as $irrigation)
                <tr>
                    @foreach(config('code_tables.'.env('APP_BRAND', 'tabacosj').'.tobacco_type') as $tobacco_type)
                        @if($tobacco_type['code'] == $contract->tobacco_type)
                            <td>{{$tobacco_type['name']}}</td>
                        @endif
                    @endforeach
                    @foreach(config('code_tables.'.env('APP_BRAND', 'tabacosj').'.tobacco_families') as $tobacco_family)
                        @if($tobacco_family['code'] == $irrigation->tobacco_family)
                            <td>{{$tobacco_family['name']}}</td>
                        @endif
                    @endforeach
                    <td></td>
                    <td>{{$irrigation->month == 8 && $irrigation->amount_p1 > 0 ?  number_format($irrigation->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 8 && $irrigation->amount_p2 > 0 ?  number_format($irrigation->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 8 && $irrigation->amount_p3 > 0 ?  number_format($irrigation->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 9 && $irrigation->amount_p1 > 0 ?  number_format($irrigation->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 9 && $irrigation->amount_p2 > 0 ?  number_format($irrigation->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 9 && $irrigation->amount_p3 > 0 ?  number_format($irrigation->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 10 && $irrigation->amount_p1 > 0 ?  number_format($irrigation->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 10 && $irrigation->amount_p2 > 0 ?  number_format($irrigation->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 10 && $irrigation->amount_p3 > 0 ?  number_format($irrigation->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 11 && $irrigation->amount_p1 > 0 ?  number_format($irrigation->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 11 && $irrigation->amount_p2 > 0 ?  number_format($irrigation->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$irrigation->month == 11 && $irrigation->amount_p3 > 0 ?  number_format($irrigation->amount_p3, 2, ".", ",") : ''}}</td>
                </tr>
            @endforeach
        @endforeach
    </table>

    <p><strong>CRONOGRGAMA PLANTACION TABACO.UM/Ha</strong></p>
    <table border="1" cellpadding="2" cellspacing="0">
        <tr>
            <th rowspan="2">Tipo de tabaco</th>
            <th rowspan="2">Variedad</th>
            <th rowspan="2" width="25">Total general</th>
            <th colspan="3">Octubre</th>
            <th colspan="3">Noviembre</th>
            <th colspan="3">Diciembre</th>
            <th colspan="3">Enero</th>
        </tr>
        <tr>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
        </tr>
        @foreach($contracts as $contract)
            @foreach($contract->plantingSchedules as $planting)
                <tr>
                    @foreach(config('code_tables.'.env('APP_BRAND', 'tabacosj').'.tobacco_type') as $tobacco_type)
                        @if($tobacco_type['code'] == $contract->tobacco_type)
                            <td>{{$tobacco_type['name']}}</td>
                        @endif
                    @endforeach
                    @foreach(config('code_tables.'.env('APP_BRAND', 'tabacosj').'.tobacco_families') as $tobacco_family)
                        @if($tobacco_family['code'] == $planting->tobacco_family)
                            <td>{{$tobacco_family['name']}}</td>
                        @endif
                    @endforeach
                    <td></td>
                    <td>{{$planting->month == 10 && $planting->amount_p1 > 0 ?  number_format($planting->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 10 && $planting->amount_p2 > 0 ?  number_format($planting->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 10 && $planting->amount_p3 > 0 ?  number_format($planting->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 11 && $planting->amount_p1 > 0 ?  number_format($planting->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 11 && $planting->amount_p2 > 0 ?  number_format($planting->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 11 && $planting->amount_p3 > 0 ?  number_format($planting->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 12 && $planting->amount_p1 > 0 ?  number_format($planting->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 12 && $planting->amount_p2 > 0 ?  number_format($planting->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 12 && $planting->amount_p3 > 0 ?  number_format($planting->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 1 && $planting->amount_p1 > 0 ?  number_format($planting->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 1 && $planting->amount_p2 > 0 ?  number_format($planting->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$planting->month == 1 && $planting->amount_p3 > 0 ?  number_format($planting->amount_p3, 2, ".", ",") : ''}}</td>
                </tr>
            @endforeach
        @endforeach
    </table>

    <p><strong>CORONOGRAMA DE ACOPIO TABACO.UM/ Ton</strong></p>
    <table border="1" cellpadding="2" cellspacing="0">
        <tr>
            <th rowspan="2">Tipo de tabaco</th>
            <th rowspan="2">Variedad</th>
            <th rowspan="2" width="25">Total general</th>
            <th colspan="3">Febrero</th>
            <th colspan="3">Marzo</th>
            <th colspan="3">Abril</th>
            <th colspan="3">Mayo</th>
            <th colspan="3">Junio</th>
        </tr>
        <tr>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
            <th>1era</th>
            <th>2da</th>
            <th>3era</th>
        </tr>
        @foreach($contracts as $contract)
            @foreach($contract->harvestSchedules as $harvest)
                <tr>
                    {{-- <td>{{$contract->tobacco_type}}</td>--}}
                    @foreach(config('code_tables.'.env('APP_BRAND', 'tabacosj').'.tobacco_type') as $tobacco_type)
                        @if($tobacco_type['code'] == $contract->tobacco_type)
                            <td>{{$tobacco_type['name']}}</td>
                        @endif
                    @endforeach
                    @foreach(config('code_tables.'.env('APP_BRAND', 'tabacosj').'.tobacco_families') as $tobacco_family)
                        @if($tobacco_family['code'] == $harvest->tobacco_family)
                            <td>{{$tobacco_family['name']}}</td>
                        @endif
                    @endforeach
                    <td></td>
                    <td>{{$harvest->month == 2 && $harvest->amount_p1 > 0 ?  number_format($harvest->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 2 && $harvest->amount_p2 > 0 ?  number_format($harvest->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 2 && $harvest->amount_p3 > 0 ?  number_format($harvest->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 3 && $harvest->amount_p1 > 0 ?  number_format($harvest->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 3 && $harvest->amount_p2 > 0 ?  number_format($harvest->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 3 && $harvest->amount_p3 > 0 ?  number_format($harvest->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 4 && $harvest->amount_p1 > 0 ?  number_format($harvest->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 4 && $harvest->amount_p2 > 0 ?  number_format($harvest->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 4 && $harvest->amount_p3 > 0 ?  number_format($harvest->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 5 && $harvest->amount_p1 > 0 ?  number_format($harvest->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 5 && $harvest->amount_p2 > 0 ?  number_format($harvest->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 5 && $harvest->amount_p3 > 0 ?  number_format($harvest->amount_p3, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 6 && $harvest->amount_p1 > 0 ?  number_format($harvest->amount_p1, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 6 && $harvest->amount_p2 > 0 ?  number_format($harvest->amount_p2, 2, ".", ",") : ''}}</td>
                    <td>{{$harvest->month == 6 && $harvest->amount_p3 > 0 ?  number_format($harvest->amount_p3, 2, ".", ",") : ''}}</td>
                </tr>
            @endforeach
        @endforeach
    </table>
</div>

{{--sign footer--}}
<div class="footer">
    <table width="100%" style="
        vertical-align: bottom;
        font-family: Arial;
        font-size: 8pt;
        font-weight: bold;
        font-style: italic"
    >
        <tr>
            <td style="text-align: center;">
                _______________________________________
            </td>
            <td style="text-align: center">

                _______________________________________

            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                <strong>Dtor Agr&iacute;cola</strong>
            </td>
            <td style="text-align: center">

                <strong>Productor</strong>

            </td>
        </tr>
        <tr>
            <td style="text-align: center;">
                <strong>Isaac Paz Travieso</strong>
            </td>
            <td style="text-align: center">
            </td>
        </tr>
    </table>
</div>
{{--/sign footer--}}

@if($areThereGathering)
    <pagebreak></pagebreak>

    <div class="page">
        <p style="text-align: center"><strong>-CONTRATO No. @for($i = 0; $i < count($contracts); $i ++) {{$i + 1 < count($contracts)  ? $contracts[$i]->id.', ' : $contracts[$i]->id. ' / '}} @endfor {{date('Y')}}. ANEXO 6</strong></p>
        <p><strong>PLAN DE ACOPIO</strong></p>
        @if(count($classes_tp) > 0)
            <p><strong>TABACO TAPADO</strong></p>
                <table border="1" cellpadding="2" cellspacing="0">
                    <tr>
                        <th rowspan="2">Clases</th>
                        <th rowspan="2">Precios</th>
                        <th colspan="2">Produccion</th>
                    </tr>
                    <tr>
                        <th>Mjo</th>
                        <th>Valor</th>
                    </tr>
                    <tr>
                        <th>Capa de Exportacion (Mjo)</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Grupo 1</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>

                    @foreach($classes_tp as $gatheringClass)
                        @if($gatheringClass['type'] == 'EX' && $gatheringClass['group'] == 01)
                            <tr>
                                <td>{{$gatheringClass['name']}}</td>
                                <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                                <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                                <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                            </tr>
                        @endif
                    @endforeach
                    <tr>
                        <th>Grupo 2</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    @foreach($classes_tp as $gatheringClass)
                        @if($gatheringClass['type'] == 'EX' && $gatheringClass['group'] == 02)
                            <tr>
                                <td>{{$gatheringClass['name']}}</td>
                                <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                                <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                                <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                            </tr>
                        @endif
                    @endforeach
                    <tr>
                        <th>Capa de consumo nacional</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    @foreach($classes_tp as $gatheringClass)
                        @if($gatheringClass['type'] == 'CN' /*&& $gatheringClass->tobaccoClass->group == 02*/)
                            <tr>
                                <td>{{$gatheringClass['name']}}</td>
                                <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                                <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                                <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                            </tr>
                        @endif
                    @endforeach
                    <tr>
                        <th>Tripas y capotes</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    @foreach($classes_tp as $gatheringClass)
                        @if($gatheringClass['type'] == 'TC' /*&& $gatheringClass->tobaccoClass->group == 02*/)
                            <tr>
                                <td>{{$gatheringClass['name']}}</td>
                                <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                                <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                                <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                            </tr>
                        @endif
                    @endforeach
                    <?php
                    $total_value = 0;
                    foreach($classes_tp as $gatheringClass)
                        $total_value += ($gatheringClass['amoun'] * $gatheringClass['price'])
                    ?>
                    <tr>
                        <th>TOTAL</th>
                        <td></td>
                        <td></td>
                        <th>{{number_format($total_value, 2, ".", ",")}}</th>
                    </tr>

                </table>
            @endif

        {{--TOBACCO BURLEY CLASSES--}}
        @if(count($classes_by) > 0)
            <p><strong>TABACO BURLEY</strong></p>
            <table border="1" cellpadding="2" cellspacing="0">
                <tr>
                    <th rowspan="2">Clases</th>
                    <th rowspan="2">Precios</th>
                    <th colspan="2">Produccion</th>
                </tr>
                <tr>
                    <th>Mjo</th>
                    <th>Valor</th>
                </tr>
                <tr>
                    <th>Capa de Exportacion (Mjo)</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                {{--<tr>
                    <th>Grupo 1</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>--}}

                @foreach($classes_by as $gatheringClass)
                    @if($gatheringClass['type'] == 'EX')
                        <tr>
                            <td>{{$gatheringClass['name']}}</td>
                            <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                            <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                            <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                        </tr>
                    @endif
                @endforeach
                {{--<tr>
                    <th>Grupo 2</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                @foreach($classes_by as $gatheringClass)
                    @if($gatheringClass['type'] == 'EX' && $gatheringClass['group'] == 02)
                        <tr>
                            <td>{{$gatheringClass['name']}}</td>
                            <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                            <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                            <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                        </tr>
                    @endif
                @endforeach--}}
                <tr>
                    <th>Capa de consumo nacional</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                @foreach($classes_by as $gatheringClass)
                    @if($gatheringClass['type'] == 'CN' /*&& $gatheringClass->tobaccoClass->group == 02*/)
                        <tr>
                            <td>{{$gatheringClass['name']}}</td>
                            <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                            <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                            <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                        </tr>
                    @endif
                @endforeach
                <tr>
                    <th>Tripas y capotes</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                @foreach($classes_by as $gatheringClass)
                    @if($gatheringClass['type'] == 'TC' /*&& $gatheringClass->tobaccoClass->group == 02*/)
                        <tr>
                            <td>{{$gatheringClass['name']}}</td>
                            <td>{{number_format($gatheringClass['price'], 2, ".", ",")}}</td>
                            <td>{{number_format($gatheringClass['amoun'], 2, ".", ",")}}</td>
                            <td>{{number_format(($gatheringClass['amoun'] * $gatheringClass['price']), 2, ".", ",")}}</td>
                        </tr>
                    @endif
                @endforeach
                <?php
                $total_value_by = 0;
                foreach($classes_by as $gatheringClass)
                        $total_value_by += ($gatheringClass['amoun'] * $gatheringClass['price'])
                ?>
                <tr>
                    <th>TOTAL</th>
                    <td></td>
                    <td></td>
                    <th>{{number_format($total_value_by, 2, ".", ",")}}</th>
                </tr>

            </table>
        @endif
    </div>

    {{--sign footer--}}
    <div class="footer">
        <table width="100%" style="
        vertical-align: bottom;
        font-family: Arial;
        font-size: 8pt;
        font-weight: bold;
        font-style: italic"
        >
            <tr>
                <td style="text-align: center;">
                    _______________________________________
                </td>
                <td style="text-align: center">

                    _______________________________________

                </td>
            </tr>
            <tr>
                <td style="text-align: center;">
                    <strong>Dtor Agr&iacute;cola</strong>
                </td>
                <td style="text-align: center">

                    <strong>Productor</strong>

                </td>
            </tr>
            <tr>
                <td style="text-align: center;">
                    <strong>Isaac Paz Travieso</strong>
                </td>
                <td style="text-align: center">
                </td>
            </tr>
        </table>
    </div>
    {{--/sign footer--}}

@endif
