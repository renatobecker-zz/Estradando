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
        $data = $response['data'];

        $results = array_values(array_sort($data, function ($value) {
            return $value['name'];
        }));

        return Response::json(array('success'=>true,'data'=>$results)); 
    }

    public function category($id) {
        $config = config('facebook.graph.category.uri');
        $uri = '/' . $id . '?' . http_build_query($config);
        $response = Facebook::get($uri, $this->getToken())->getDecodedBody();        
        return Response::json(array('success'=>true,'data'=>$response)); 
    }

    public function events() {
        $center = [];
        $q      = [];        
        //$center = ['center' => '-29.5698,-50.7924'];   
        $center = ['center' => '-23.5505,-46.6333'];               
        if (Request::ajax()) {   
            $geolocation = Request::input('geolocation');
            $center = ['center' => $geolocation['latitude'] . ',' . $geolocation['longitude']];
            
            $query  = Request::input('query');
            if ($query) {
                $q = array('q' => $query);
            }
        } 
        $config = array_merge($q,$center, config('facebook.graph.events.uri'));

        $response = $this->search($config);
        return Response::json(array('success'=>true,'data'=>$response)); 
    }

    public function places() {
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

        $config = array_merge($q, $center, config('facebook.graph.search.uri'));        
        $response = $this->search($config);     
        return Response::json(array('success'=>true,'data'=>$response)); 
    }

    private function search($params) {          
        $data = array();
        $uri = $this->searchUrl . http_build_query($params);
    	$response = Facebook::get($uri, $this->getToken())->getGraphEdge();// ->getDecodedBody();
        $data = $response->asArray();
        //Pagination                    
        while ($next = Facebook::next($response)) {
            $data = array_merge($data, $next->asArray());        
            $response = $next;            
        }
            
        return $data;
    }
}
