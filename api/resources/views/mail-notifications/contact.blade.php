@extends('mail-notifications.layouts.base')


@section('content')

    <div style="width: 100%; text-align: left; background-color: #EFEFEF; float: left; font-family: Arial, Helvetica, sans-serif; color: #222; padding: 10px; box-sizing: border-box">
        <h3 style="padding-bottom: 10px; float: left">Consulta desde la web</h3>

        <p style="width: 100%; padding-bottom: 5px; float: left;">
            <b>Nombre:</b> {!! $nombre !!}<br />
            <b>Correo:</b> {!! $correo !!}<br />
            <b>Teléfono:</b> {!! $telefono !!}<br />
            <b>Mensaje:</b> {!! $mensaje !!}<br />
        </p>

    </div>
@endsection

