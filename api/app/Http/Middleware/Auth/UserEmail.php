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
        Validator::validator(
            $request->all(),
            array(
                'email' => 'required|string|email|exists:users,email'
            )
        );

        return $next($request);
    }
}
