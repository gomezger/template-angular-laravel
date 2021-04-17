<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Users\AuthController@login')->middleware('auth.login');
    Route::post('signup', 'Users\AuthController@signup')->middleware('auth.signup');

    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'Users\AuthController@logout');
        Route::get('user', 'Users\AuthController@user');
    });
});

/** -----------------------------------------
 * --------------- USER----------------------
 * -------------------------------------- **/
Route::group(['prefix' => 'user'], function () {
    Route::get('', 'Users\UserController@all');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::post('', 'Users\UserController@insert')->middleware('user.data', 'user.password', 'user.email.repeat');
        Route::put('', 'Users\UserController@update')->middleware('user.data');
        Route::post('/{email}', 'Users\UserController@delete')->middleware('user.email');
    });
});

/** -----------------------------------------
 * --------------- STORAGE ------------------
 * -------------------------------------- **/
Route::group(['prefix' => 'storage'], function () {
    Route::post('image', 'Storage\StorageController@uploadImage')->middleware('storage.image');
    Route::post('pdf', 'Storage\StorageController@uploadPdf')->middleware('storage.pdf');

    Route::group(['middleware' => 'auth:api'], function () {

    });
});

/**
 * para enviar todos los mensajes
 */
Route::group (['prefix' => '/avisos'], function () {
    Route::get('send-all', 'Avisos\AvisosController@sendAll');
});

