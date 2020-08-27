<?php

namespace App\Http\Middleware\Auth;

use Closure;
use App\Helpers\Validator\Validator;

class LoginMiddleware
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
                'email'       => 'required|string|email',
                'password'    => 'required|string',
                'remember_me' => 'boolean',
            )
        );

        return $next($request);
    }
}
