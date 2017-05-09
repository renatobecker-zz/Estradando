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
use URL;
use App\User;
use App\SocialAccount;
use App\Classes\Helpers as Helper;
use Vinkla\Pusher\Facades\Pusher;
use App\Models\Config\CatalogCategory as CatalogCategory;
use App\Models\Data\Notification as Notification;
use App\Models\Data\Itinerary as Itinerary;

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
        $config = $this->get_default_view_params();
        JavaScript::put(['config' => $config]);
        return view('pages.itinerary');
    }

    public function logout() {
        Auth::logout();
        Session::flush();

        return redirect("/");
    }

    public function load($id) {
        
        $itinerary = Itinerary::find($id);
        $itinerary->members_info = $this->members_info($itinerary);

        if (is_null($itinerary)) {
            return redirect()->action(
                'ItineraryController@home'
            );
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
        $creator_id            = (Auth::check()) ? Auth::user()->_id : null;
        $itinerary             = new Itinerary;
        $itinerary->name       = Request::get('name');
        $itinerary->creator_id = $creator_id;
        $itinerary->start_date = Helper::convertToMongoDate(Request::get('start_date'));
        $itinerary->end_date   = Helper::convertToMongoDate(Request::get('end_date'));
        $itinerary->invites    = [];
        $itinerary->members    = [$creator_id];        
        if ($itinerary->save()) {
            return Response::json(array('success'=>true,'data'=>$itinerary)); 
        }      
    }

    public function invite_friend() {

        $id        = Request::get('id');
        $friend_id = Request::get('friend_id');        
        
        $itinerary = Itinerary::find($id);

        if (is_null($itinerary)) {
            return Response::json(array('success'=>false,
                                        'message'=>'Itinerário inválido.')); 
        }        

        $invites = $itinerary->invites;
        if (in_array($friend_id, $invites)) {
            return Response::json(array('success'=>true,
                                        'message'=>'Há um convite pendente para este amigo.')); 
        } 
            
        array_push($invites, $friend_id);            
        $itinerary->invites = $invites;
        if ($itinerary->save()) {
            return Response::json(array('success'=>true,'data'=>'Convite enviado.')); 
        } else {
            return Response::json(array('success'=>false,'data'=>'Erro ao enviar convite.')); 
        }                  
        
    }

    public function accept_invite($id, $friend_id) {

        $itinerary = Itinerary::find($id);
        if (is_null($itinerary)) {
            abort(404);
        }        

        $invites = $itinerary->invites;
        $invite = (string) $friend_id;
        if (!in_array($invite, $invites)) {
            abort(404);
        }         

        $account = SocialAccount::whereProvider('facebook')
            ->whereProviderUserId($friend_id)
            ->first();

        if ($account) {
            if (Auth::user()->_id !== $account->user_id) {
                abort(404);
            }

            $members = $itinerary->members;
            if (!in_array($account->user_id, $members)) {
                array_push($members, $account->user_id);            
                $itinerary->members = $members;
            }       

            if (($key = array_search($friend_id, $invites)) !== false) {
                unset($invites[$key]);
                $itinerary->invites = $invites;
            }

            if ($itinerary->save()) {      
                $member = User::find($account->user_id);
                $text = $member->name . " aceitou o convite para participar do roteiro.";

                //Deve ser enviado antes de criar a notification
                //Quando o client receber, irá atualizar os dados com o membro já aceito
                $obj = $itinerary;
                $obj->members_info = $this->members_info($itinerary);
                $message_channel = "channel_" . $id;
                Pusher::trigger($message_channel, 'itinerary', ['data' => $obj->toArray()]);

                $notification = new Notification;
                $notification->itinerary_id = $id;
                $notification->text         = $text;
                $notification->type         = "member_accepted";
                $notification->data         = array("user_id" => $account->user_id);
                $notification->save();

                return redirect()->action(
                    'ItineraryController@load', ['id' => $id]
                );                
            }    
        } else {
            abort(404);
        }    
    }

    public function add_place($itinerary, $place_id, $user_id) {

    }

    private function members_info($itinerary) {
        $members_info = [];
        foreach ($itinerary->members as $member) {
            $user = User::find($member);
            $account = SocialAccount::whereProvider('facebook')
            ->whereUserId($member)
            ->first();
            if ($account) {
                $user->provider_user_id = $account->provider_user_id;
            }
            $members_info[] = $user;
        }
        return $members_info;
    }

    private function get_default_view_params() {
        $config = [];
        $config['user']                = Auth::user();
        $config['catalog_categories']  = $this->get_catalog_categories();
        $config['redirect_invite_url'] = URL::to('/') . "/itinerary/accept_invite/";
        $config['destination']         = $this->get_default_location();
        $config['pusher']              = array(
                "app_id" => env("PUSHER_APP_ID"),
                "app_key" => env("PUSHER_APP_KEY"),
                "app_secret" => env("PUSHER_APP_SECRET"),
                "app_cluster" => env("PUSHER_APP_CLUSTER")
            );
        return $config;
    }

    private function is_user_allowed($itinerary, $user_id) {
        $allowed = ( ($itinerary->creator_id == $user_id) ||
                   (in_array($user_id, $itinerary->members)) );
        return $allowed;
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

    private function get_default_location() {
        return Session::get('default_location');
    }

    public function set_default_location() {
        $default_location = Request::get('default_location');                
        Session::set('default_location', $default_location);
        return Response::json(array('success'=>true,'data'=>$default_location));         
    }
}
