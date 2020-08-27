<?php

namespace App\Http\Middleware\Auth;

use Closure;
use App\Helpers\Validator\Validator;

class SignupMiddleware
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
        Validator::validator(
            $request->all(),
            array(
                'nombre'     => 'required|string',
                'email'    => 'required|string|email|unique:users',
                'tipo' => 'required',
                'password' => 'required|string|confirmed|min:8',
            )
        );

        return $next($request);
    }
}
