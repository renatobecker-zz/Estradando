<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('login/facebook', 'SocialAuthController@redirect');
Route::get('login/facebook/callback', 'SocialAuthController@callback');
Route::auth();

//Route::get('/home'           , 'HomeController@index');

Route::group(['middleware' => 'auth'], function () {
	Route::get('/itinerary'      				 , 'ItineraryController@index');
	Route::get('/api/markers'	  				 , 'FacebookController@markers');
	Route::get('/api/places'    		         , 'FacebookController@places');
	Route::get('/api/events'    		         , 'FacebookController@events');
    Route::get('/api/categories/{topic_filter?}' , 'FacebookController@categories');
    Route::get('/api/category/{id}'	 	         , 'FacebookController@category');
    Route::get('/api/graph/{id}' 	 	         , 'FacebookController@graph');
    Route::get('/api/cities/find_by_name'        , 'CityController@findByName');
});

 	