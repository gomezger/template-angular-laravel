<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} @stack('title')</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    @stack('scripts-head')

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Tajawal|Montserrat|Satisfy|Raleway:400,700" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/global.css') }}" />
    @stack('styles')

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-145221237-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-145221237-1');
    </script>


    <!-- meta -->
    @stack('metas')
</head>
<body style="box-sizing: border-box;">
    <div id="app" style="display: inline-block; width: 90%; max-width: 600px; text-align: left">
        @include('avisos/components/header')
        
        <div class="clearfix"></div>

        <main style="display: inline-block; width: 100%; max-width: 600px; text-align: left; float: left">
            @yield('content')
        </main>

        <div class="clearfix"></div>

        @include('avisos/components/footer')

    </div>
    
    <!-- Scripts -->
    @stack('scripts')
    <script defer src="{{ asset('/lib/fontawesome-pro-5.13.0-web/js/all.js') }}"></script> 
</body>
</html>
