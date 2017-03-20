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

Route::get('/home'           , 'HomeController@index');
Route::get('/itinerary'      , 'ItineraryController@index');
Route::get('/itinerary/icons', 'ItineraryController@icons');


Route::group(['middleware' => 'auth'], function () {
	Route::get('/api/search'     , 'FacebookController@search');
    Route::get('/api/categories' , 'FacebookController@categories');
    Route::get('/api/graph/{id}' , 'FacebookController@graph');
});

