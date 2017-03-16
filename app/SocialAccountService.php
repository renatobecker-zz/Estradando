<?php

namespace App;

use Laravel\Socialite\Contracts\User as ProviderUser;
use App\SocialAccount;
use Session;

class SocialAccountService {

    public function createOrGetUser(ProviderUser $providerUser) {
        Session::set('user_token', $providerUser->token);
        //Session::get('user_token');

        $account = SocialAccount::whereProvider('facebook')
            ->whereProviderUserId($providerUser->getId())
            ->first();

        if ($account) {
            return $account->user;
        } else {

            $account = new SocialAccount([
                'provider_user_id' => $providerUser->getId(),
                'provider' => 'facebook'
            ]);

            $user = User::whereEmail($providerUser->getEmail())->first();

            if (!$user) {

                $user = User::create([
                    'email' => $providerUser->getEmail(),
                    'name' => $providerUser->getName(),
                    'avatar' => $providerUser->getAvatar(),
                ]);
            }
            $account->user()->associate($user);
            $account->save();

            return $user;
        }
    }
}