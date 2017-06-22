<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;
use Session;
use Facebook;
use Response;
use App;
use App\Models\Config\CatalogCategory as CatalogCategory;
use App\Models\Config\OriginalCategory as OriginalCategory;
use App\Models\Config\Category as Category;

class FacebookController extends Controller
{
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

    public function list_categories() {
        
        $config = config('facebook.graph.categories.uri');
        $uri = $this->searchUrl . http_build_query($config);
        $response = Facebook::get($uri, $this->getToken())->getDecodedBody();   
        $data = $response['data'];
        
        $results = array_values(array_sort($data, function ($value) {
            return $value['name'];
        }));
        
        return Response::json(array('success'=>true,'data'=>$data));        
    }

    public function categories($topic_filter=null) {
                
        $categories = Category::all();    
        return Response::json(array('success'=>true,'data'=>$categories));
        
    }
    /*
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
        $center = ['center' => '-29.5698,-50.7924'];   
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
        $data = $this->add_event_marker($response);        
        return Response::json(array('success'=>true,'data'=>$data)); 
    }
    */
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
        $data = $this->add_place_marker($response);        
        return Response::json(array('success'=>true,'data'=>$data)); 
    }

    public function catalog_categories() {
        $catalog_categories = CatalogCategory::all();    
        return Response::json(array('success'=>true,'data'=>$catalog_categories)); 
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
    /*
    public function parent_categories() {
        $parent_categories = Session::get('parent_categories');
        if ($parent_categories) {
            return $parent_categories;
        }
        $config  = config('facebook.graph.parent_categories.uri');   
        $uri = $this->searchUrl . http_build_query($config);
        $parent_categories = Facebook::get($uri, $this->getToken())->getDecodedBody();   
        $result  = collect($parent_categories['data']);
        Session::set('parent_categories', $result);
        return $result;
    }
    */
    private function find_marker_category($categories, $markers, $default) {
        $marker_category = null;        
        foreach ($categories as $category) {
            $search = is_array($category) ? $category['id'] : $category;                
            foreach ($markers as $marker) {                        
                $list = $marker['parent_ids'];                    
                if (in_array($search, $list)) {
                    $marker_category = array(
                        "marker_category" => $search,
                        'icon' => $marker["icon"],
                        'color' => $default["color"],
                        'shape' => $default["shape"]
                        );
                    break;
                }
            }
            if ($marker_category) break;               
        }
        return $marker_category;
    }

    private function add_event_marker($data) {
        $result  = [];
        $config  = config('facebook.graph.config.markers');   
        $default = $config['events'];
        foreach ($data as $obj) {
            if (array_key_exists("events", $obj)) {
                $events = $obj["events"];
                foreach ($events as $event) {
                    if (!array_key_exists("place", $event)) {
                        $event["place"]["id"] = $obj["id"];
                        $event["place"]["location"] = $obj["location"];
                        $event["place"]["name"] = $obj["name"];
                    }
                    $event["marker"] = $default;  
                    $event["type"] = "event";                     
                    $result[] = $event;
                }
            }
        }
        return $result;        
    }

    public function get_original_category_name($term=null) {
        $searchs = ($term) ? [$term] : null;
        if (Request::ajax()) {   
            $param = Request::input('term');
            $searchs = (is_array($param)) ? $param : [$param];
        } 
        if ($searchs) {
            $results = [];
            $errors  = [];
            foreach ($searchs as $term) {
                $category = Category::whereName($term)->first();
                if ($category) {
                    $originalTerm = OriginalCategory::whereId($category->id)->first();
                    if ($originalTerm) {
                        $results[] = $originalTerm->name; //testar com plural_name                        
                    } else {
                        $errors[] = $term;
                    }    
                }                    
            }
            return Response::json(array('success'=>true,'data'=>$results,'errors'=>$errors));         
        }
        return Response::json(array('success'=>false,'data'=>null));             
    }

    private function add_place_marker($data) {
        $result  = [];
        $config  = config('facebook.graph.config.markers');   
        $default = $config['places'];
        $markers = $this->markers();
        $catalog = $this->parent_categories();
        foreach ($data as $obj) {
            $categories = $obj['category_list'];
            $marker_category = $this->find_marker_category($categories, $markers, $default);
            if (!$marker_category) {      
                foreach ($categories as $category) {
                    $ctg = $catalog->first(function ($key, $value) use ($category) {
                        return $value["id"] == $category["id"];
                    });  
                    if ($ctg) {
                        if (array_key_exists('parent_ids', $ctg)) {
                            $categories = $ctg['parent_ids'];
                            $marker_category = $this->find_marker_category($categories, $markers, $default);
                        }
                    }              
                    if ($marker_category) break;               
                }
            }    
            if (!$marker_category) {        
                $marker_category = $default;                    
            }            
            $obj["marker"] = $marker_category;  
            $obj["type"] = "place";                     
            $result[] = $obj;
        }
        return $result;    
    }
}
