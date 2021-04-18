<?php

use Illuminate\Support\Facades\Route;

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
