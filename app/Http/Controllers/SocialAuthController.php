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
        //Verifica existência de necessidade de redirect após login
        $redirect_back = session()->get('redirect_back');
        if ($redirect_back) {
            session()->forget('redirect_back');   
            return redirect()->to($redirect_back);        
        }
        return redirect()->to('/home');        
    }    
}
