<?php
Route::get('login/facebook', 'SocialAuthController@redirect');
Route::get('login/facebook/callback', 'SocialAuthController@callback');
Route::auth();

Route::get('/'                , 'HomeController@welcome');
Route::get('/itinerary/logout', 'ItineraryController@logout');
//mudar para post
Route::post('/itinerary/invite'                       , 'ItineraryController@invite_friend');

Route::group(['middleware' => 'auth'], function () {
    Route::post('/set_default_location'          , 'ItineraryController@set_default_location');
	Route::get('/home'               			 , 'ItineraryController@home');
    Route::get('/itinerary/{id}'                 , 'ItineraryController@load');
    Route::post('/itinerary/store'               , 'ItineraryController@store');
    Route::post('/itinerary/edit/{id}'           , 'ItineraryController@update');    
    Route::post('/itinerary/add_place'           , 'ItineraryController@add_place');
    Route::post('/itinerary/remove_place'        , 'ItineraryController@remove_place');    
    Route::get('/itinerary/accept_invite/{id}/{friend_id}', 'ItineraryController@accept_invite');    
	Route::get('/api/catalog_categories'		 , 'FacebookController@catalog_categories');
	Route::get('/api/places'    		         , 'FacebookController@places');	
    Route::get('/api/categories/{topic_filter?}' , 'FacebookController@list_categories');
    Route::get('/api/original_category/{term?}'  , 'FacebookController@get_original_category_name');
    Route::get('/api/graph/{id}' 	 	         , 'FacebookController@graph');
    Route::get('/api/cities/find_by_name'        , 'CityController@findByName');

    Route::get('/messages'                       , 'ChatController@list_messages');
    Route::post('/messages'                      , 'ChatController@save_message');

    Route::get('/notifications'                  , 'NotificationController@list_notifications');    
});

 	