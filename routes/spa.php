<?php

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

Route::group( [
    'guard' => 'spa',
], function() {
    Route::post( 'auth/register', 'AuthController@register' )->withoutMiddleware( ['spa'] );
    Route::post( 'auth/login', 'AuthController@login' )->withoutMiddleware( ['spa'] );
    Route::post( 'auth/logout', 'AuthController@logout' )->withoutMiddleware( ['spa'] );
    Route::post( 'auth/user', 'AuthController@user' );

    Route::get( 'email/verify/{id}/{hash}', 'AuthController@verify' )->withoutMiddleware( ['spa'] )->middleware( 'signed' )->name( 'verification.verify' );
} );
