<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ $title }}</title>
        <link rel="stylesheet" href="/css/app.css?v=1.0">
    </head>
    <body>
        <div id="head">TODO</div>
        <div id="content"></div>
        {{ $slot }}
    </body>
</html>