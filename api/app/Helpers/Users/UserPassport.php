<?php

namespace App\Helpers\Users;

use App\Models\Users\User;
use App\Repositories\Users\UserRepo;
use Illuminate\Support\Facades\DB;

class UserPassport {

    public static function user(string $token): User{
        $auth_header = explode(' ', $token);
        $token = $auth_header[1];
        $token_parts = explode('.', $token);
        $token_header = $token_parts[1];
        $token_header_json = base64_decode($token_header);
        $token_header_array = json_decode($token_header_json, true);
        $user_token = $token_header_array['jti'];
        $user_id = DB::table('oauth_access_tokens')->where('id', $user_token)->value('user_id');
        return UserRepo::find($user_id);
    }

}
