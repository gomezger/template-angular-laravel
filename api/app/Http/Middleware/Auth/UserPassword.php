<?php

namespace App\Http\Middleware\Auth;

use App\Helpers\Validator\Validator;
use Closure;

class UserPassword
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
                'password' => 'required|string|min:8'
            )
        );

        return $next($request);
    }
}
