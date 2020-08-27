<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;
use App\Helpers\Response\Response;

class Authenticate extends Middleware
{    
    public function handle($request, Closure $next){
        if (! $request->expectsJson()) {
            return Response::error("401","Error en login",['No inició sesión']);
        }
    }
}
