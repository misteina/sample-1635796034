<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ $title }}</title>
        <link rel="stylesheet" href="/css/app.css">
    </head>
    <body>
        <div id="head">TODO</div>
        {{ $slot }}
        <div id="content"></div>
        {{ $script }}
    </body>
</html>