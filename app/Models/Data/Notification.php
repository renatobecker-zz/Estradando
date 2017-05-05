<?php 

namespace app\Models\Data;

use Moloquent;
use Vinkla\Pusher\Facades\Pusher;

class Notification extends Moloquent {

    protected $collection = 'data.notifications';
    /*Schema {
		itinerary_id = hash
		text = string
		action = string
		data = {}
    }*/

	public static function boot() {
        parent::boot();

        static::created(function(Notification $notification) {
        	$message_channel = "channel_" . $notification->itinerary_id;
            Pusher::trigger($message_channel, 'notification', ['notification' => $notification]);
        });
    }    
}       