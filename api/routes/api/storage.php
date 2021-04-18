<?php

use Illuminate\Support\Facades\Route;

/** -----------------------------------------
 * --------------- STORAGE ------------------
 * -------------------------------------- **/
Route::group(['prefix' => 'storage'], function () {

    Route::group(['middleware' => ['auth:api', 'auth.isAdmin']], function () {
        Route::post('image', 'Storage\StorageController@uploadImage')->middleware('storage.image');
        Route::post('pdf', 'Storage\StorageController@uploadPdf')->middleware('storage.pdf');
    });
});
