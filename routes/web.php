<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LogoutController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
/*
Route::get('/', function () {
    return view('welcome');
});
*/

Route::middleware(['no_auth'])->group(function () {

    Route::get('/', [LoginController::class, 'showPage']);

    Route::get('/register', [RegisterController::class, 'showPage']);

    Route::post('/login', [LoginController::class, 'login']);

    Route::post('/register', [RegisterController::class, 'register']);

});

Route::middleware(['auth'])->group(function () {

    Route::get('/profile', ProfileController::class);

    Route::resource('todos', TodoController::class)->except(['edit', 'create', 'show']);

    Route::get('/logout', LogoutController::class);

});