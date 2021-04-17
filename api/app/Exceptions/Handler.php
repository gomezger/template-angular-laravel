<?php

namespace App\Exceptions;

use App\Helpers\MailNotifications\MailNotifications;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($exception instanceof \App\Exceptions\ExceptionManager) {
            return \App\Helpers\Response\Response::error($exception->getErrorCode(), $exception->getErrors());

        }else if ($exception->getMessage() !== '' && $exception->getMessage() !== 'Unauthenticated') {

            $avisos = new MailNotifications(config('mail.from.support'));
            $avisos->fatal_error(
                'Error en la web',
                [
                    'message' => $exception->getMessage(),
                    'code' => $exception->getCode(),
                    'file' => $exception->getFile(),
                    'line' => $exception->getLine(),
                    'trace' => $exception->getTrace(),
                    'trace_string' => $exception->getTraceAsString(),
                ]
            );
        }
        return parent::render($request, $exception);
    }
}
