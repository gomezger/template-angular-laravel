<?php

use Illuminate\Support\Facades\Route;


Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'Users\AuthController@login')->middleware('auth.login');
    Route::post('signup', 'Users\AuthController@signup')->middleware('auth.signup');

    Route::group(['middleware' => 'auth:api'], function() {
        Route::get('logout', 'Users\AuthController@logout');
        Route::get('user', 'Users\AuthController@user');
    });
});
