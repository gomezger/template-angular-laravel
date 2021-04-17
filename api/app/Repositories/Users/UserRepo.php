<?php

namespace App\Repositories\Users;

use App\Models\Users\User;

class UserRepo {

    public static function find($id){
        return User::find($id);
    }

    public static function findByEmail($email){
        return User::where('email',$email)->first();
    }

    public static function all(){
        return User::orderBy('nombre','ASC')->get();
    }

    public static function insert($data){
        return User::create($data);
    }

    public static function update($id, $data){
        $user = self::find($id);
        $user->update($data);
        return $user;
    }

    public static function delete($email){
        $user = self::findByEmail($email);
        $user->delete();
        return $user;
    }
}
