<style>
    /* page size: 740px */
    body {
        font-family: 'titilliumweb', sans-serif
    }

    .wm {
        width: 100%;
        height: 100%;
        background: url('{{public_path("assets/images/tabacosj/watermark.png")}}') no-repeat bottom left;
        background-image-resize: 0;
        background-size: 100%;
    }

    .address {
        position: absolute;
        top: 170px;
        left: 20px;
        width: 20px;
        padding-top: 100px;
        font-size: 9px;
    }

    hr {
        margin: 2px
    }

    table {
        width: 100%;
        font-size: 13px
    }

    .fl {
        float: left
    }

    .fr {
        float: right
    }

    .cl {
        clear: both
    }

    .tb {
        font-weight: bold
    }

    .tu {
        text-transform: uppercase
    }

    .tc {
        text-align: center
    }

    .tr {
        text-align: right
    }

    .container {
        padding: 15px
    }

    .container-right {
        padding-right: 50px
    }

    .page {
        padding-top: 5px
    }

    .title {
        font-size: 38px;
        padding: 3px
    }

    .st {
        margin-bottom: 10px;
        font-size: 22px;
        padding: 3px;
        font-weight: bold
    }

    .color {
        color: rgb(120, 41, 28)
    }

    .box {
        border: 1px solid #1C5D95;
        border-radius: 10px
    }

    .box2 {
        border: 1px solid #1C5D95
    }

    .bt {
        border-top: 2px solid #E8CC28
    }

    .bb {
        border-bottom: 2px solid #E8CC28
    }

    .bg {
        background-color: #E8CC28
    }

    .pag {
        position: absolute;
        right: 0;
        bottom: 60px;
        width: 25px;
        color: #fff;
        background-color: rgb(120, 41, 28);
        border-radius: 10px 0 0 10px;
        padding: 3px 10px 3px 10px;
        font-size: 12px;
    }

    .mt-25 {
        margin-top: 25px
    }

    .mb-25 {
        margin-bottom: 25px
    }

    .mb-200 {
        margin-bottom: 200px
    }
</style>

<div class="wm">

    <!-- TITLE -->
    <div class="mb-200">
        <div style="width:100%">
            <div class="tc">
                <img width="256px" src="{{public_path('assets/images/tabacosj/logo.png')}}">
            </div>
        </div>
        <div class="clear"></div>
    </div>

    <div class="title tc mt-25">RESULTADOS DEL PAGO EN CL</div>
    <div class="st tc tb">BALANCE GENERAL</div>

    <!-- <div class="address">
        <table style="font-size: 10px">
            <tr>
                <td text-rotate="90">Zulux Energía S.L. (CIF: B-88404751) Madrid, Calle Yecora, 61, CP, 28022. Registro
                    Mercantil de Madrid, Tomo 39263, Folio 51, Hoja M-697421
                </td>
            </tr>
        </table>
    </div> -->
</div>

<div class="tb tc pag">1</div>

<page_break></page_break>

<div class="wm">
    <div class="container container-right" style="padding-top: 20px">

        <div class="st bb">1 | Datos de la CCS</div>

        <!-- <div class="fl" style="padding-left:25px">
            <table>
                <tr>
                    <td width="110px" class="color tb">Factura Nº</td>
                    <td width="115px" class="tr">{{ '$invoiceNumber' }}</td>
                    <td width="30px"></td>
                    <td class="color tb">Fecha Factura:</td>
                    <td class="">{{ '$createdAt' }}</td>
                    <td class="color tb">Fecha Vencimiento:</td>
                    <td class="">{{ '$contractExpiration' }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="color tb">Inicio Facturación:</td>
                    <td class="">{{ '$invoicedIntervalBegin' }}</td>
                    <td class="color tb">Fin Facturación:</td>
                    <td class="">{{ '$invoicedIntervalEnd' }}</td>
                    <td></td>
                </tr>
            </table>

            <table style="margin-top: 20px" cellpadding="2" cellspacing="0">
                <tr>
                    <td width="110px" class="tb bg">TOTAL FACTURA:</td>
                    <td width="115px" class="tb tr bg">{{ str_replace('.', ',', '$invoiceTotal') }}</td>
                    <td></td>
                </tr>
            </table>
        </div> -->

        <!-- <div class="cl"></div> -->
    </div>

    <!-- <div class="container container-right" style="padding-top: 20px">

        <div class="st bb">2 | Datos del cliente</div>

        <div class="fl" style="padding-left:25px">
            <table>
                <tr>
                    <td class="tb color" width="80px">Titular:</td>
                    <td>{{ '$clientFullname' }}</td>
                    <td class="tb color" width="110px">DNI | NIF | CIF:</td>
                    <td width="120px">{{ '$document' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td class="tb color" width="70px">Dirección:</td>
                    <td>{{ '$supplyAddress' }}</td>
                    <td class="tb color" width="40px">C.P.:</td>
                    <td width="60px">{{ '$postalCode' }}</td>
                    <td class="tb color" width="75px">Población:</td>
                    <td width="150px">{{ '$population' }}</td>
                </tr>
            </table>
        </div>

        <div class="cl"></div>
    </div>

    <div class="container" style="padding-top: 20px">

        <div class="st bb">3 | Datos de suminstro</div>

        <div class="fl" style="padding-left:25px;width:350px">
            <table>
                <tr>
                    <td width="40px" class="tb color">CUPS:</td>
                    <td class="tr">{{ '$cups' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="110px" class="tb color">No de Contador</td>
                    <td class="tr"></td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="60px" class="tb color">Dirección:</td>
                    <td class="tr">{{ '$supplyAddress' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="110px" class="tb color">Código Postal:</td>
                    <td class="tr">{{ '$postalCode' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="70px" class="tb color">Población:</td>
                    <td class="tr">{{ '$population' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="70px" class="tb color">Provincia:</td>
                    <td class="tr">{{ '$province' }}</td>
                </tr>
            </table>
        </div>

        <div class="fr" style="padding-left:25px;width:320px">
            <table>
                <tr>
                    <td width="150px" class="tb color">Número de Contrato:</td>
                    <td class="tr">{{ '$reference' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="150px" class="tb color">Fecha fin contrato:</td>
                    <td class="tr">{{ '$contractExpiration' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="150px" class="tb color">Fecha fin contrato:</td>
                    <td class="tr">{{ '$contractExpiration' }}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <td width="100px" class="tb color">Tarifa:</td>
                    <td class="tr">{{ '$rate' }}</td>
                </tr>
            </table>

        </div>

        <div class="cl"></div>
    </div> -->
</div>

<div class="tb tc pag">2</div>