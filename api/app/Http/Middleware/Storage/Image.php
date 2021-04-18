<?php

namespace App\Http\Middleware\Storage;

use App\Helpers\Validator\Validator;
use Closure;
use Illuminate\Http\Request;

class Image
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
                'file'       => 'required|mimes:jpeg,gif,png,webp',
                'disk'       => 'required|string|max:191|in:'. $this->getDisks(),
            ),
            array(
                'file.required' => 'El archivo es requerido',
                'file.mimes' => 'Los formatos válidos son: jpeg, gif, png y webp',
                'disk.required' => 'Especifique el disco donde quiere guardar el archivo',
                'disk.in' => 'El disco no es válido',
            )
        );
        return $next($request);
    }

    private function getDisks(): string {
        return implode(',', array_keys(config('filesystems.disks')));
    }

}
