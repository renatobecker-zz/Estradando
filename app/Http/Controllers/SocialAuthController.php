<?php

namespace App\Http\Controllers;
use Socialite;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\SocialAccountService;

class SocialAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('facebook')->redirect();   
    }   

    public function callback(SocialAccountService $service)
    {        
        $user = $service->createOrGetUser(Socialite::driver('facebook')->user());
        auth()->login($user);
        /*
        if (session()->get('from')) {
            return redirect(session()->get('from'));
        }*/
        return redirect()->to('/home');        
    }    
}
