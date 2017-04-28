<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Input;
use Response;
use Vinkla\Pusher\Facades\Pusher;
use App\Models\Data\Message as Message;
use App\Classes\Helpers as Helpers;

class ChatController extends Controller
{
    public function getLogin()
    {
        return view("login");
    }
 
    public function getChat()
    {
        return view("chat");
    }
 
    public function save_message()
    {
        if(Request::ajax()) {
            $data = Input::all();
            $message = new Message;
            $message->itinerary_id = $data["itinerary_id"];
            $message->user_id      = $data["user_id"];
            $message->message      = $data["message"];
            $message->save();
 
            $message_channel = "channel_" . $data["itinerary_id"];
            Pusher::trigger($message_channel, 'message', ['message' => $message]);
            return Response::json(array('success'=>true,'message'=>$message));         
        }
    }
 
    public function list_messages(Message $message) {
        return response()->json($message->orderBy("created_at", "DESC")->take(5)->get());
    }
}