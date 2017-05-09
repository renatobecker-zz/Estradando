<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;
use Response;
use Vinkla\Pusher\Facades\Pusher;
use App\Models\Data\Notification as Notification;
use App\Classes\Helpers as Helpers;

class NotificationController extends Controller
{
    public function list_notifications() {
        $Notification = new Notification;
        $itinerary_id = Request::get('itinerary_id');
		$limit        = 5;
        $limit_request = (int) Request::get('limit'); 
        if ($limit > 0) {
        	$limit = $limit_request;
        }
        return response()->json($Notification->whereItineraryId($itinerary_id)->orderBy("created_at", "DESC")->take($limit)->get());
    }
}