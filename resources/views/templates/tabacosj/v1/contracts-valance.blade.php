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
    .mb-200 {
        text-align: center;
    }

</style>
<div class="page">

    <div class="mb-200">
        <div style="width:100%">
                <img src="{{public_path('assets/images/logo.jpg')}}" style="width: 210px; height: 85px">
        </div>
    </div>


    <div>
       {{-- <div style="float: left; width: 30%">
            <h4><p style="text-align:left"><strong>Fecha: </strong> {{date('d-m-Y')}}</p></h4>
        </div>--}}
        <div style="text-align: center; width: 70%">
        <h4><p style="text-align:right"><strong>Balance de la contrataci&#243;n - Campa&ntilde;a 22/23, ABT. P del
                    R&iacute;o</strong></p></h4>
        </div>
    </div>
    <table border="1" cellpadding="2" cellspacing="0">
        <tr>
            <th rowspan="2" style="text-align: center">Unidad de Producci&#243;n</th>
            {{--<th colspan="2">Tipo de propiedad</th>--}}
            <th colspan="3">Vega Fina</th>
            <th colspan="3">Vega segunda</th>
            <th colspan="3">Tapado</th>
            <th colspan="3">Sol Palo</th>
            <th colspan="3" style="text-align: center">Burley</th>
            <th colspan="3" style="text-align: center">Total</th>
        </tr>
        <tr>

            {{--<th>Usufructo</th>
            <th>Propiedad</th>--}}
            <th>ha</th>
            <th>tn</th>
            <th>tn / ha</th>
            <th>ha</th>
            <th>tn</th>
            <th>tn / ha</th>
            <th>ha</th>
            <th>tn</th>
            <th>tn / ha</th>
            <th>ha</th>
            <th>tn</th>
            <th>tn / ha</th>
            <th>ha</th>
            <th>tn</th>
            <th>tn / ha</th>
            <th>ha</th>
            <th>tn</th>
            <th>tn / ha</th>
        </tr>

        @foreach($contracts as $key => $val)
            <tr>

                <td>{{$key}}</td>
                {{--<th>Usufructo</th>
                <th>Propiedad</th>--}}
                <td>{{number_format($val['area_v1'], 2, '.', ',')}}</td>
                <td>{{number_format($val['ton_v1'], 2, '.', ',')}}</td>
                <td style="text-align: center">{{number_format($val['performance_v1'], 2, '.', ',')}}</td>
                <td>{{number_format($val['area_v2'], 2, '.', ',')}}</td>
                <td>{{number_format($val['ton_v2'], 2, '.', ',')}}</td>
                <td style="text-align: center">{{number_format($val['performance_v2'], 2, '.', ',')}}</td>
                <td>{{number_format($val['area_tp'], 2, '.', ',')}}</td>
                <td>{{number_format($val['ton_tp'], 2, '.', ',')}}</td>
                <td style="text-align: center">{{number_format($val['performance_tp'], 2, '.', ',')}}</td>
                <td>{{number_format($val['area_sp'], 2, '.', ',')}}</td>
                <td>{{number_format($val['ton_sp'], 2, '.', ',')}}</td>
                <td style="text-align: center">{{number_format($val['performance_sp'], 2, '.', ',')}}</td>
                <td>{{number_format($val['area_by'], 2, '.', ',')}}</td>
                <td>{{number_format($val['ton_by'], 2, '.', ',')}}</td>
                <td style="text-align: center">{{number_format($val['performance_by'], 2, '.', ',')}}</td>
                <td><strong>{{number_format(($val['area_by'] + $val['area_sp'] + $val['area_v1'] + $val['area_v2'] + $val['area_tp']), 2, '.', ',')}}</strong></td>
                <td><strong>{{number_format(($val['ton_by'] + $val['ton_sp'] + $val['ton_v1'] + $val['ton_v2'] + $val['ton_tp']), 2, '.', ',')}}</strong></td>
                <td style="text-align: center"><strong>{{number_format(($val['ton_by'] + $val['ton_sp'] + $val['ton_v1'] + $val['ton_v2'] + $val['ton_tp']) / ($val['area_by'] + $val['area_sp'] + $val['area_v1'] + $val['area_v2'] + $val['area_tp']), 2, '.', ',')}}</strong></td>
            </tr>
        @endforeach
        {{--<tr>
            <td><strong>Total</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
            <td><strong>0.00</strong></td>
        </tr>--}}
    </table>
    <pagebreak></pagebreak>
    <div>
        <div style="width: 80%; float: left">
            <h4><p>Resumen General: </p></h4>
            <table>
                <tr>
                    <th style="text-align: left">Plan a contratar:</th>
                    <td style="text-align: left">{{number_format($total_area_to_contract, 2, '.', '.')}} ha</td>
                    <th style="text-align: left">Contratado:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts, 2, '.', ',')}} ha</td>
                    <th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts / $total_area_to_contract * 100, 2, '.', ',')}} %</td>
                   {{-- <th style="text-align: right">Tapado:</th>
                    <td style="text-align: right">{{number_format($excecution_contracts_tobacco_type['tp'], 2, '.', ',')}} ha</td>--}}
                </tr>
                <tr>
                    <th style="text-align: left">Productores a contratar:</th>
                    <td style="text-align: left">{{number_format($total_farmers, 2, '.', ',')}}</td>
                    <th style="text-align: left">Contratados:</th>
                    <td style="text-align: left">{{number_format($farmers_contracted, 2, '.', ',')}}</td>
                    <th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{number_format($farmers_contracted / $total_farmers * 100, 2, '.', ',')}} %</td>
                    {{--<th style="text-align: right">Vega Fina:</th>
                    <td style="text-align: right">{{number_format($excecution_contracts_tobacco_type['v1'], 2, '.', ',')}} ha</td>--}}
                </tr>
                <tr>
                    <th style="text-align: left">Plan Tabaco Tapado:</th>
                    <td style="text-align: left">{{number_format($total_area_tp, 2, '.', ',')}} ha</td>
                    <th style="text-align: left">Contratados:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['tp'], 2, '.', ',')}} ha</td>
                    <th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['tp'] / $total_area_tp * 100, 2, '.', ',')}} %</td>
                    {{--<th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts / $total_area_to_contract * 100, 2, '.', ',')}} %</td>
                    <th style="text-align: right">Vega Segunda:</th>
                    <td style="text-align: right">{{number_format($excecution_contracts_tobacco_type['v2'], 2, '.', ',')}} ha</td>--}}
                </tr>
                <tr>
                    <th style="text-align: left">Plan Tabaco Vega Fina:</th>
                    <td style="text-align: left">{{number_format($total_area_v1, 2, '.', ',')}} ha</td>
                    <th style="text-align: left">Contratados:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['v1'], 2, '.', ',')}} ha</td>
                    <th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['v1'] / $total_area_v1 * 100, 2, '.', ',')}} %</td>
                </tr>
                <tr>
                    <th style="text-align: left">Plan Tabaco Vega Segunda:</th>
                    <td style="text-align: left">{{number_format($total_area_v2, 2, '.', ',')}} ha</td>
                    <th style="text-align: left">Contratados:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['v2'], 2, '.', ',')}} ha</td>
                    <th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['v2'] / $total_area_v2 * 100, 2, '.', ',')}} %</td>
                </tr>
                <tr>
                    <th style="text-align: left">Plan Tabaco Palo:</th>
                    <td style="text-align: left">{{number_format($total_area_sp, 2, '.', ',')}} ha</td>
                    <th style="text-align: left">Contratados:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['sp'], 2, '.', ',')}} ha</td>
                    <th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['sp'] / $total_area_sp * 100, 2, '.', ',')}} %</td>
                </tr>
                <tr>
                    <th style="text-align: left">Plan Tabaco Burley:</th>
                    <td style="text-align: left">{{number_format($total_area_by, 2, '.', ',')}} ha</td>
                    <th style="text-align: left">Contratados:</th>
                    <td style="text-align: left">{{number_format($excecution_contracts_tobacco_type['by'], 2, '.', ',')}} ha</td>
                    <th style="text-align: left">% de ejecuci&oacute;n:</th>
                    <td style="text-align: left">{{--{{number_format($excecution_contracts_tobacco_type['by'] / $total_area_by * 100, 2, '.', ',')}}--}}-- %</td>
                </tr>
            </table>
        </div>
    </div>

</div>


{{--sign footer--}}
{{--<div class="footer">
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
</div>--}}
{{--/sign footer--}}
