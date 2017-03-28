<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Response;
//use Symfony\Component\Yaml\Yaml;
use App\Models\Config\Icons as Icons;
use JavaScript;

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
     * Show the application dashboard.d
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$icons = $this->icons();
        //JavaScript::put(['icons' => $icons]);
        return view('pages.itinerary');
    }

    public function icons() {
        $category = ['Web Application Icons']; 
        //$term   = Request::input('term');
        $icons = Icons::whereIn('categories', $category)->get(array('id', 'filter'));    
        return $icons;
    }
}
