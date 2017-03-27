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

    public function categories($topic_filter=null) {
        $config = config('facebook.graph.categories.uri');
        if ($topic_filter) {
            $config['topic_filter'] = $topic_filter;
        }
        $uri = $this->searchUrl . http_build_query($config);
        $response = Facebook::get($uri, $this->getToken())->getDecodedBody();        
        return Response::json(array('success'=>true,'data'=>$response['data'])); 
    }

    public function category($id) {
        $config = config('facebook.graph.category.uri');
        $uri = '/' . $id . '?' . http_build_query($config);
        $response = Facebook::get($uri, $this->getToken())->getDecodedBody();        
        return Response::json(array('success'=>true,'data'=>$response)); 
    }

    public function events() {
        /*
        É interessante também fazer merge com os eventos criados pelos places da 
        Geolocalização escolhida
        */
        $location = 'igrejinha/rs'; //Parâmetro
        if (Request::ajax()) {   
            $location = Request::input('location');
        } 
        $q      = ['q' => $location];        
        $config = array_merge($q, config('facebook.graph.events.uri'));                
        $response = $this->search($config);
        return Response::json(array('success'=>true,'data'=>$response['data'])); 
    }

    public function places() {
        $data   = [];
        $center = [];
        $q      = [];        
        $center = ['center' => '-29.5698,-50.7924'];   
        //$center = ['center' => '-23.5505,-46.6333'];               
        if (Request::ajax()) {   
            $geolocation = Request::input('geolocation');
            $center = ['center' => $geolocation['latitude'] . ',' . $geolocation['longitude']];
            
            $query  = Request::input('query');
            if ($query) {
                $q = array('q' => $query);
            }
        } 

        $config = array_merge($q, $center, config('facebook.graph.places.uri'));        
        $response = $this->search($config);        
        return Response::json(array('success'=>true,'data'=>$response['data'])); 
    }

    private function search($params) {          
        //$center = [];
        //$q      = [];                        
        $uri = $this->searchUrl . http_build_query($params);
        //$params['limit'] = 10;
    	$response = Facebook::get($uri, $this->getToken())->getDecodedBody();
        //NECESSÁRIO TRATAR PAGINAÇÃO!!!
    	return $response;
    }
}
