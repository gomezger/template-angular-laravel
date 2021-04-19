<?php

namespace App\Http\Middleware\Auth;

use App\Helpers\Validator\Validator;
use Closure;

class UserEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        $email = (isset($request->all()['email']))
            ? $request->all()['email']
            : $request->route('email', null);

        Validator::validator(
            ['email' => $email],
            ['email' => 'required|string|email|exists:users,email']
        );

        return $next($request);
    }
}
