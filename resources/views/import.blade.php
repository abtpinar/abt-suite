<table>
    <tr>
        <td>tarifa</td>
        <td>denominacion</td>
        <td>p1</td>
        <td>p2</td>
        <td>p3</td>
        <td>p1</td>
        <td>p2</td>
        <td>p3</td>
    </tr>
    @foreach ($offer_rates as $obj)
        <tr>
            <td>{{ $obj->product }}</td>
            <td>{{ $obj->indexed_price }}</td>
            <td>{{ $obj->price_1 }}</td>
            <td>{{ $obj->price_2 }}</td>
            <td>{{ $obj->price_3 }}</td>
            <td>{{ $obj->price_4 }}</td>
            <td>{{ $obj->price_5 }}</td>
            <td>{{ $obj->price_6 }}</td>
        </tr>
    @endforeach
</table>