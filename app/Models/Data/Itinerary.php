<?php 

namespace app\Models\Data;

use Moloquent;

class Itinerary extends Moloquent {

    protected $collection = 'data.itineraries';   

    public static function rules($_id = null) {

        $rules = ['name' => 'required|min:5|max:255', 
                  'start_date' => 'required'
                 ]; 

        return $rules;           
    }
}       