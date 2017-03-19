<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
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
        //$q = ['q' => 'igrejinha/rs'];
        //$q = ['q' => ''];
        $center = ['center' => '-29.57,-50.79'];
        $config = array_merge($center, config('facebook.graph.search.uri'));        
        $uri = $this->searchUrl . http_build_query($config);
    	$response = Facebook::get($uri, $this->getToken())->getDecodedBody();
    	return Response::json(array('success'=>true,'data'=>$response['data'])); 
    }
}
