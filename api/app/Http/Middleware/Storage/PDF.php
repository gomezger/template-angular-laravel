<?php

namespace App\Http\Middleware\Storage;

use App\Helpers\Validator\Validator;
use Closure;
use Illuminate\Http\Request;

class PDF
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
            [
                'file' => $request->file('file', null),
                'disk' => $request->input('disk', null)
            ],
            array(
                'file'       => 'required|mimes:pdf',
                'disk'       => 'required|string|max:191',
            )
        );
        return $next($request);
    }
}
