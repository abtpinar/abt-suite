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
    <p style="text-align:center"><strong>CONTRATO No. {{$contract->id}} / {{date('Y')}}</strong></p>

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

    <p><strong>DE OTRA PARTE: <span class="tu"> {{ $contract->farmer->first_name }}
                &#32;{{ $contract->farmer->middle_name }}&#32;{{ $contract->farmer->last_name }}</span></strong>
        ciudadano cubano, mayor de edad, con número de carnet de identidad <strong><span
                    class="tu">{{$contract->farmer->ci}}</span></strong>,
        teléfono <strong><span
                    class="tu">{{!empty($contract->farmer->telephone_number) ? $contract->farmer->telephone_number : '--'}}</span></strong>,
        perteneciente a <strong><span class="tu">{{$contract->farmer->productionUnit->name}}</span></strong>,
        que posee cuenta bancaria en moneda nacional CUP
        No. <strong><span class="tu">{{!empty($contract->farmer->cup_card) ? $contract->farmer->cup_card : '--'}}</span></strong>,
        cuenta bancaria en MLC con número <strong><span
                    class="tu">{{!empty($contract->farmer->mlc_card) ? $contract->farmer->mlc_card : '--'}}</span></strong>,
        municipio y provincia Pinar del Rio, tenedor legal de <strong><span
                    class="tu">{{number_format($area, 2, '.', ',')}}</span></strong> hectáreas de tierra,
        que posee en calidad de <strong><span
                    class="tu">@foreach ($propesrties as $p) {{$p}} @endforeach</span></strong>, lo que acredita
        mediante la Certificación de Tenedor Inscripto
        No. <strong><span class="tu">@foreach ($record_numbers as $p) {{$p}} @endforeach</span></strong>,
        emitido por el Jefe del Registro de Tenencia de la Tierra del municipio Pinar del Rio, en fecha <strong><span
                    class="tu">@foreach ($dates as $p) {{$p}} @endforeach</span></strong>, el que comparece en
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
            {{--@foreach(config('code_tables.'.env('APP_BRAND', 'tabacosj').'.tobacco_type') as $tobacco_type)
                        @if($tobacco_type['code'] == $contract->tobacco_type)
                            <th>{{$tobacco_type['name']}}</th>
                        @endif
                    @endforeach--}}
            <th>Tapado</th>
            <th>Vega fina</th>
            <th>Vega segunda</th>
            <th>Sol palo</th>
            <th>Burley</th>
        </tr>
        <tr>
            <td>&#193;rea de siembra</td>
            <td style="text-align: center">ha</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($contract->planting_area, 2,".",","): ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($contract->planting_area, 2,".",",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($contract->planting_area, 2,".",",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($contract->planting_area, 2,".",",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($contract->planting_area, 2,".",",") : ''}}</td>
            <td><strong>{{number_format($contract->planting_area, 2,".",",")}}</strong></td>
        </tr>
        <tr>
            <td>Posturas a plantar</td>
            <td style="text-align: center">miles</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($contract->thousands_plants, 2, ".", ",") : ''}}</td>
            <td><strong>{{number_format($contract->thousands_plants, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td rowspan="2">Producci&#243;n (acopio)</td>
            <td style="text-align: center">tt</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format(($contract->production / 21.74), 2, ".", ",") : ''}}</td>
            <td><strong>{{number_format(round($contract->production / 21.74, 2), 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td style="text-align: center">qq</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($contract->production, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($contract->production, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($contract->production, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($contract->production, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($contract->production, 2, ".", ",") : ''}}</td>
            <td><strong>{{number_format($contract->production, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td>Rendimiento</td>
            <td style="text-align: center">t/ha</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($contract->performance, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($contract->performance, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($contract->performance, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($contract->performance, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($contract->performance, 2, ".", ",") : ''}}</td>
            <td><strong>{{number_format($contract->performance, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td rowspan="1">Capas para exportaci&#243;n (acopio)</td>
            <td style="text-align: center">&#37;</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($contract->export_porcentage, 2, ".", ",") : ''}}</td>
            <td><strong>{{number_format($contract->export_porcentage, 2, ".", ",")}}</strong></td>
        </tr>
        {{--<tr>
            <td style="text-align: center">qq</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format((($contract->production * $contract->export_porcentage) / 100) , 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format((($contract->production * $contract->export_porcentage) / 100), 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format((($contract->production * $contract->export_porcentage) / 100), 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format((($contract->production * $contract->export_porcentage) / 100), 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format((($contract->production * $contract->export_porcentage) / 100), 2, ".", ",") : ''}}</td>
            <td>
                <strong>{{number_format(round(($contract->production * $contract->export_porcentage) / 100, 2), 2, ".", ",")}}</strong>
            </td>
        </tr>--}}
        <tr>
            <td>Precio de venta</td>
            <td style="text-align: center">Mn</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($sale_price, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($tobacco_price * 46, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($tobacco_price * 46, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($tobacco_price * 46, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($sale_price, 2, ".", ",") : ''}}</td>
            <td>
                <strong>{{$contract->tobacco_type == 'TP' || $contract->tobacco_type == 'BY' ? number_format($sale_price, 2, ".", ",") : number_format($tobacco_price * 46, 2, ".", ",")}}</strong>
            </td>
        </tr>
        <tr>
            <td>Valor del acopio</td>
            <td style="text-align: center">Mn</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($gather_value, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($contract->production * $tobacco_price * 46, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($contract->production * $tobacco_price * 46, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($contract->production * $tobacco_price * 46, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($gather_value, 2, ".", ",") : ''}}</td>
            <td>
                <strong>{{$contract->tobacco_type == 'TP' || $contract->tobacco_type == 'BY' ? number_format($gather_value, 2, ".", ",") : number_format($contract->production * $tobacco_price * 46, 2, ".", ",")}}</strong>
            </td>
        </tr>
        <tr>
            <td>Capacidad de compra</td>
            <td style="text-align: center">Mn</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($purchase_budget, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($purchase_budget, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V2' ? number_format($purchase_budget, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'SP' ? number_format($purchase_budget, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($purchase_budget, 2, ".", ",") : ''}}</td>
            <td><strong>{{number_format($purchase_budget, 2, ".", ",")}}</strong></td>
        </tr>
        <tr>
            <td>Capacidad de compra</td>
            <td style="text-align: center">Cl</td>
            <td>{{$contract->tobacco_type == 'TP' ? number_format($cl_purchase_budget, 2, ".", ",") : ''}}</td>
            <td>{{$contract->tobacco_type == 'V1' ? number_format($contract->production * $tobacco_price * 46 * $contract->export_porcentage / 100 * 3.6 /100, 2, ".", ",") : ''}}</td>
            <td style="background-color: #9c9c9c"></td>
            <td style="background-color: #9c9c9c"></td>
            <td>{{$contract->tobacco_type == 'BY' ? number_format($cl_purchase_budget, 2, ".", ",") : ''}}</td>
            @if($contract->tobacco_type != 'V2' && $contract->tobacco_type != 'SP')
                <td>
                    <strong>{{$contract->tobacco_type == 'TP' || $contract->tobacco_type == 'BY' ? number_format($cl_purchase_budget, 2, ".", ",") : number_format($contract->production * $tobacco_price * 46 * $contract->export_porcentage / 100 * 3.6 /100, 2, ".", ",")}}</strong>
                </td>
            @endif
            @if($contract->tobacco_type == 'V2' || $contract->tobacco_type == 'SP')
                <td style="background-color: #9c9c9c"></td>
            @endif
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
    <p style="text-align: center"><strong>CONTRATO No. {{$contract->id}} / {{date('Y')}}. ANEXO 1</strong></p>
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
        $amount = 0;
        $pay = 0;
        ?>
        @foreach($contract->products as $product)
            @if($product->basic)
                @if(\App\Data\Entities\Product::find($product->product_id)->category != '03')
                    <tr>
                        <td>{{$product->product->name}}</td>
                        <td style="text-align: center">{{$product->measurement_unit}}</td>
                        <td style="text-align: right">{{$product->amount}}</td>
                        <td style="text-align: right">{{$product->price}}</td>
                        <td style="text-align: right">{{number_format(($product->price * $product->amount), 2, '.', ',')}}</td>
                        {{--<td>{{\App\Data\Entities\Product::find($product->product_id)->category}}</td>--}}
                    </tr>
                @endif
            @endif
        @endforeach
        @foreach($contract->products as $product)
            @if($product->basic)
                @if(\App\Data\Entities\Product::find($product->product_id)->category == '03')
                    {!! $amount += $product->amount !!}
                    {!! $pay += $product->price * $product->amount !!}
                @endif
            @endif
        @endforeach
        <tr>
            <td>FITOSANITARIO</td>
            <td style="text-align: center">KG</td>
            <td style="text-align: right">{!! $amount !!}</td>
            <td style="text-align: right"> --</td>
            <td style="text-align: right">{!! number_format($pay, 2, '.', ',')!!}</td>
        </tr>
        <tr>
            <td><strong>TOTAL</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <?php
            $total = 0;
            ?>
            @foreach($contract->products as $product)
                @if($product->basic)
                    {!! $total += ($product->amount*$product->price) !!}
                @endif
            @endforeach
            <td style="text-align: right"><strong>{{number_format($total, 2, '.', ',')}}</strong></td>
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
    <p style="text-align: center"><strong>CONTRATO No. {{$contract->id}} / {{date('Y')}}. ANEXO 2</strong></p>
    <p><strong>OTROS GASTOS</strong></p>
    <table border="1" cellpadding="2" cellspacing="0">
        <tr>
            <th>Insumos</th>
            <th>U.M</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Importe</th>
            {{-- <th>Fecha entrega</th>--}}
        </tr>
        @foreach($contract->products as $product)
            @if(!$product->basic)
                <tr>
                    <td>{{$product->product->name}}</td>
                    <td style="text-align: center">{{$product->measurement_unit}}</td>
                    <td style="text-align: right">{{$product->amount}}</td>
                    <td style="text-align: right">{{$product->price}}</td>
                    <td style="text-align: right">{{number_format(($product->price * $product->amount), 2, '.', ',')}}</td>
                </tr>
            @endif
        @endforeach
        <tr>
            <td><strong>TOTAL</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <?php
            $totalOtrosG = 0;
            ?>
            @foreach($contract->products as $product)
                @if(!$product->basic)
                    {!! $totalOtrosG += ($product->amount*$product->price) !!}
                @endif
            @endforeach
            <td style="text-align: right"><strong>{{number_format($totalOtrosG, 2, '.', ',')}}</strong></td>
        </tr>
    </table>
    {{--</div>--}}
    {{--<pagebreak></pagebreak>--}}

    {{--<div class="page">--}}
    <p style="text-align: center"><strong>CONTRATO No. {{$contract->id}} / {{date('Y')}}. ANEXOS (3, 4, 5)</strong></p>
    <p><strong>Cronograma de Riega de Semilleros de Tabaco. UM/ Canteros.</strong></p>
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
    </table>
    <p><strong>Cronograma de Plantación de Tabaco.UM/Ha</strong></p>
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
    </table>
    <p><strong>Cronograma de Acopio de Tabaco.UM/ Ton</strong></p>
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

@if($contract->tobacco_type == 'TP' || $contract->tobacco_type == 'BY')
    <pagebreak></pagebreak>

    <div class="page">
        <p style="text-align: center"><strong>-CONTRATO No. {{$contract->id}} / {{date('Y')}}. ANEXO 6</strong></p>
        <p><strong>Plan de acopio</strong></p>
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
            @if($contract->tobacco_type == 'TP')
            <tr>
                <th>Grupo 1</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            @endif
            @foreach($contract->tobaccoClassSchedules as $gatheringClass)
                @if(($gatheringClass->tobaccoClass->type == 'EX' && $gatheringClass->tobaccoClass->group == 01) ||
                ($contract->tobacco_type == 'BY' && $gatheringClass->tobaccoClass->type == 'EX'))
                    <tr>
                        <td>{{$gatheringClass->tobaccoClass->name}}</td>
                        <td>{{number_format($gatheringClass->tobaccoClass->price, 2, ".", ",")}}</td>
                        <td>{{number_format($gatheringClass->amount, 2, ".", ",")}}</td>
                        <td>{{number_format(($gatheringClass->amount * $gatheringClass->tobaccoClass->price), 2, ".", ",")}}</td>
                    </tr>
                @endif
            @endforeach
            @if($contract->tobacco_type == 'TP')
                <tr>
                    <th>Grupo 2</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            @endif
            @if($contract->tobacco_type == 'TP')
                @foreach($contract->tobaccoClassSchedules as $gatheringClass)
                    @if($gatheringClass->tobaccoClass->type == 'EX' && $gatheringClass->tobaccoClass->group == 02)
                        <tr>
                            <td>{{$gatheringClass->tobaccoClass->name}}</td>
                            <td>{{number_format($gatheringClass->tobaccoClass->price, 2, ".", ",")}}</td>
                            <td>{{number_format($gatheringClass->amount, 2, ".", ",")}}</td>
                            <td>{{number_format(($gatheringClass->amount * $gatheringClass->tobaccoClass->price), 2, ".", ",")}}</td>
                        </tr>
                    @endif
                @endforeach
            @endif
            <tr>
                <th>Capa de consumo nacional</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            @foreach($contract->tobaccoClassSchedules as $gatheringClass)
                @if($gatheringClass->tobaccoClass->type == 'CN' /*&& $gatheringClass->tobaccoClass->group == 02*/)
                    <tr>
                        <td>{{$gatheringClass->tobaccoClass->name}}</td>
                        <td>{{number_format($gatheringClass->tobaccoClass->price, 2, ".", ",")}}</td>
                        <td>{{number_format($gatheringClass->amount, 2, ".", ",")}}</td>
                        <td>{{number_format(($gatheringClass->amount * $gatheringClass->tobaccoClass->price), 2, ".", ",")}}</td>
                    </tr>
                @endif
            @endforeach
            @if($contract->tobacco_type == 'TP')
                <tr>
                    <th>Tripas y capotes</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                @foreach($contract->tobaccoClassSchedules as $gatheringClass)
                    @if($gatheringClass->tobaccoClass->type == 'TC' /*&& $gatheringClass->tobaccoClass->group == 02*/)
                        <tr>
                            <td>{{$gatheringClass->tobaccoClass->name}}</td>
                            <td>{{number_format($gatheringClass->tobaccoClass->price, 2, ".", ",")}}</td>
                            <td>{{number_format($gatheringClass->amount, 2, ".", ",")}}</td>
                            <td>{{number_format(($gatheringClass->amount * $gatheringClass->tobaccoClass->price), 2, ".", ",")}}</td>
                        </tr>
                    @endif
                @endforeach
            @endif
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

@endif
