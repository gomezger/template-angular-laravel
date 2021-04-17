<?php

namespace App\Http\Middleware\Auth;

use App\Helpers\Validator\Validator;
use Closure;

class UserData
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

        $messages = [
            'role.required' => 'El rol del usuario es obligatorio.',
            'role.in' => 'El rol elegido no es válido.',
        ];

        Validator::validator(
            $request->all(),
            array(
                'nombre'       => 'required|string|max:64',
                'email'       => 'required|string|email',
                'role'       => 'required|in:admin,minorista,mayorista',
            ),
            $messages
        );

        return $next($request);
    }
}
