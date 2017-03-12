<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Moloquent;

class SocialAccount extends Moloquent
{
    protected $fillable = ['user_id', 'provider_user_id', 'provider'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}