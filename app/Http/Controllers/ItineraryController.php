<?php

namespace App\Http\Controllers;

use App\Http\Requests;
USE Input;
use Request;
use Response;
use JavaScript;
use Session;
use Validator;
use Auth;
use App\Classes\Helpers as Helper;
use App\Models\Config\CatalogCategory as CatalogCategory;
use App\Models\Data\Itinerary as Itinerary;
use URL;

class ItineraryController extends Controller
{
    /*
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function home() {
        $id        = Session::get('itinerary');
        $itinerary = Itinerary::find($id);

        if (!is_null($itinerary)) {
            return redirect()->action(
                'ItineraryController@load', ['id' => $id]
            );
        }        

        $config = $this->get_default_view_params();
        JavaScript::put(['config' => $config]);
        return view('pages.itinerary');
    }

    public function logout() {
        Session::set('itinerary', null);
        return redirect()->action(
            'ItineraryController@home'
        );
    }

    public function load($id) {
        
        $itinerary = Itinerary::find($id);

        if (is_null($itinerary)) {
            abort(404);
        }        

        if (!$this->is_user_allowed($itinerary, Auth::user()->_id )) {
            abort(403, 'Permissão de acesso negada.');  
        }

        $config = $this->get_default_view_params();
        $config['itinerary'] = $itinerary;
        JavaScript::put(['config' => $config]);
        return view('pages.itinerary', [ 'itinerary' => $itinerary ]);
    }

    public function store() {

        $rules = Itinerary::rules();        
        $validator = Validator::make(Request::all(), $rules);
        if ($validator->fails()) {
            $errors = $validator->errors();
            if (Request::ajax()) {  
                return Response::json(array('success'=>false,'errors'=>$errors)); 
            } else {
                return redirect()->back()->withInput()->withErrors($errors);
            }    
        }
        $itinerary             = new Itinerary;
        $itinerary->name       = Request::get('name');
        $itinerary->creator_id = (Auth::check()) ? Auth::user()->_id : null;
        $itinerary->start_date = Helper::convertToMongoDate(Request::get('start_date'));
        $itinerary->end_date   = Helper::convertToMongoDate(Request::get('end_date'));
        if ($itinerary->save()) {
            Session::set('itinerary', $itinerary->_id);
            return Response::json(array('success'=>true,'data'=>$itinerary)); 
        }      
    }


    public function add_place($id, $place_id) {

    }

    public function invite_user($id, $user_id) {

    }

    private function get_default_view_params() {
        $config = [];
        $config['catalog_categories'] = $this->get_catalog_categories();
        $config['redirect_invite_url'] = URL::to('/') . "/itinerary/";
        return $config;
    }

    private function is_user_allowed($itinerary, $user_id) {
        //necessário tratar os usuários convidados
        return ( $itinerary->creator_id == $user_id );
    }

    private function get_catalog_categories() {
        $catalog_categories = Session::get('catalog_categories');
        if ($catalog_categories) {
            return $catalog_categories;
        }        

        $result = $catalog_categories = CatalogCategory::all()->toArray(); 
        Session::set('catalog_categories', $catalog_categories);
        return $result;
    }


}
