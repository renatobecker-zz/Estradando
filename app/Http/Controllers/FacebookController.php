<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use Illuminate\Http\Request;
use Session;
use Facebook;
use Response;

class FacebookController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }
    
    public function search() {
        $token = Session::get('user_token');
    	$response = Facebook::get('/search?q=restaurants%20in%20igrejinha/rs&center=-29.57,-50.79&type=place&fields=id,name,picture,location',$token)->getDecodedBody();
    	return Response::json(array(
                    'success' => true,
                    'data'   => $response['data']
                )); 
    }
}
