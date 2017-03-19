<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Response;
use Symfony\Component\Yaml\Yaml;

class ItineraryController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('pages.itinerary');
    }

    public function icons() {
        $path = storage_path().'/app/public/icons.yml';
        $data = Yaml::parse(file_get_contents($path));
        $base = $data['icons'];
        $filter = array_filter(array_keys($base), function ($k){ 
            return $k = 'Web Application Icons'; 
        }); 
        $result = array_intersect_key($base, array_flip($filter));
        return $result;
        return Response::json(array('success'=>true,'data'=>$result['icons'])); 
    }
}
