<?php

namespace App\Http\Middleware\Auth;

use App\Helpers\Validator\Validator;
use Closure;
use Illuminate\Http\Request;

class UserEmailRepeat
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
        Validator::validator(
            $request->all(),
            array(
                'email' => 'required|string|email|unique:users'
            )
        );
        return $next($request);
    }
}
