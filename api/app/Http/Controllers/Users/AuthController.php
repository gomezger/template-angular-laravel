<?php
namespace App\Http\Controllers\Users;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Repositories\Users\UserRepo;
use App\Helpers\Response\Response;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function signup(Request $request){
        $data = $request->all();
        $data['password'] = bcrypt($data['password']);
        $user = UserRepo::insert($data);

        return Response::success($user);
    }

    public function login(Request $request){

        $data = $request->all();
        $credentials = request(['email', 'password']);
        if (!Auth::attempt($credentials))
            return Response::error("401",['Email o contraseña incorrecto/s']);

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token para '. $credentials['email']);
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addDays(1);
        }
        $token->save();

        $user = UserRepo::findByEmail($data['email']);
        $expires = Carbon::parse($tokenResult->token->expires_at)->toDateTimeString();

        return Response::success(
                [
                    "access_token" => $tokenResult->accessToken,
                    "token_type" => 'Bearer',
                    "expires_at" => $expires,
                    "user" => $user
                ]
            );
    }

    public function logout(Request $request) {

        $request->user()->token()->revoke();
        return Response::success('Cerró sesión');
    }

    public function user(Request $request) {

        return response()->json($request->user());
    }

    public function delete(Request $request) {

        $user = UserRepo::delete($request->all()['email']);

        return Response::success('Usuario eliminado');

    }

    public function update(Request $request) {
        $user = UserRepo::update($request->all()['id'], $request->all());
        return Response::success($user);
    }

    public function userById(Request $request, $id) {
        return Response::success(UserRepo::find($id));
    }

}
