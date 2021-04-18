<?php

namespace App\Http\Middleware\Auth;

use App\Helpers\Response\Response;
use Closure;
use Illuminate\Http\Request;
use App\Helpers\Users\UserPassport;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = UserPassport::user($request->header('Authorization'));

        if ( isset($user) && isset($user->role) && $user->role === 'admin') {
            return $next($request);
        } else {
            return Response::error('401', ['Acceso denegado: es necesario ser \'admin\'']);
        }
    }
}
