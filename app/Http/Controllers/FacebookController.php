<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;
use Session;
use Facebook;
use Response;
use App;

class FacebookController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */

    private $searchUrl = '/search?';    

    public function index()
    {
        return view('home');
    }
    
    private function getToken() {
        return Session::get('user_token');
    }

    public function graph($id) {
        $uri = $this->searchUrl . $id;
        $response = Facebook::get($uri, $this->getToken())->getDecodedBody();        
        return Response::json(array('success'=>true,'data'=>$response['data'])); 
    }

    public function categories() {
        $config = config('facebook.graph.categories.uri');
        $uri = $this->searchUrl . http_build_query($config);
        $response = Facebook::get($uri, $this->getToken())->getDecodedBody();        
        return Response::json(array('success'=>true,'data'=>$response['data'])); 
    }

    public function search() {  
        
        $center = [];
        $q      = [];

        //$center = ['center' => '-29.6846,-51.1419'];            
        
        if (Request::ajax()) {   
            $geolocation = Request::input('geolocation');
            $center = ['center' => $geolocation['lat'] . ',' . $geolocation['lng']];
        } 
          
        //$q = ['q' => ''];
        $config = array_merge($q, $center, config('facebook.graph.search.uri'));        
        $uri = $this->searchUrl . http_build_query($config);
    	$response = Facebook::get($uri, $this->getToken())->getDecodedBody();
    	return Response::json(array('success'=>true,'data'=>$response['data'])); 
    }
}
