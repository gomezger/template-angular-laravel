<?php

use Illuminate\Support\Facades\Route;

/** -----------------------------------------
 * --------------- USER----------------------
 * -------------------------------------- **/
Route::group(['prefix' => 'user'], function () {
    Route::get('', 'Users\UserController@all');

    Route::group(['middleware' => ['auth:api','auth.isAdmin']], function () {
        Route::post('', 'Users\UserController@insert')->middleware('user.data', 'user.password', 'user.email.repeat');
        Route::put('', 'Users\UserController@update')->middleware('user.data');
        Route::delete('/{email}', 'Users\UserController@delete')->middleware('user.email');
    });
});
