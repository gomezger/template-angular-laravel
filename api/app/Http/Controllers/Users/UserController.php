<?php

namespace App\Http\Controllers\Users;

use App\Helpers\Response\Response;
use App\Http\Controllers\Controller;
use App\Repositories\Users\UserRepo;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function all()
    {
        $users = UserRepo::all();
        return Response::success($users);
    }

    public function delete(Request $request, $email)
    {
        $user = UserRepo::delete($email);
        return Response::success($user);
    }


    public function update(Request $request)
    {
        $data =  $request->all();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        return Response::success(UserRepo::update($data['id'], $data));
    }

    public function insert(Request $request)
    {
        $data =  $request->all();
        $data['password'] = bcrypt($data['password']);
        return Response::success(UserRepo::insert($data));
    }

    public function userById(Request $request, $id)
    {
        return Response::success(UserRepo::find($id));
    }
}
