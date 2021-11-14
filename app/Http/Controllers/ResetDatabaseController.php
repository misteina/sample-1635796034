<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;


class ResetDatabaseController extends Controller
{
    public function __invoke()
    {
        if (App::environment('local')){
            DB::unprepared('SET FOREIGN_KEY_CHECKS = 0;TRUNCATE TABLE users;TRUNCATE TABLE todos;SET FOREIGN_KEY_CHECKS = 1;');
            Cache::forget('todos');
        }
    } 
}
