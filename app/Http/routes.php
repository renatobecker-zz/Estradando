<?php

Route::get('/', function () {
    return view('welcome');
    //$users = DB::collection('users')->get();
    //$users = User::all();
    //return $users;
});

Route::get('login/facebook', 'SocialAuthController@redirect');
Route::get('login/facebook/callback', 'SocialAuthController@callback');
Route::auth();

Route::get('/home', 'HomeController@index');
