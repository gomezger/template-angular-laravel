<?php

namespace App\Http\Controllers\Notifications;

use App\Helpers\Factories\MailNotificationFactory;
use App\Helpers\Response\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Http\Request;
use App\Mail\MailNotification;
use App\Repositories\Notifications\MailNotification as MailNotificationRepo;

class MailNotificationController extends Controller
{

    public function __construct(){
        $this->support = config('mail.from.support');
    }

    /**
     * Envia todos los mails encolados (eestan en espera)
     */
    public function sendAll(){
        $notifications = MailNotificationRepo::notSent();
        foreach($notifications as $notification){
            if($this->send($notification->from, $notification->to, $notification->subject, $notification->name, $notification->view, json_decode($notification->data,true),$notification->file))
                MailNotificationRepo::update(
                    Array(
                        "id" => $notification->id,
                        "sent" => true
                    )
                );
        }
    }

    private function send ($from, $to, $subject, $name, $view, $data, $file){
        Mail::to($to)->send(new MailNotification($from, $subject, $name, $view, $data, $file));
        return true;
    }

    public function addContactNotification(Request $request){

        $data = $request->all();
        [ 'nombre' => $name, 'correo' => $email, 'telefono' => $phone, 'mensaje' => $message ] = $data;

        //enviar notificacion
        $notifications = MailNotificationFactory::init('contact', $email);
        $notifications->sendContactMessage(
            array(
                'nombre' => $name,
                'correo' => $email,
                'telefono' => $phone,
                'mensaje' => $message
            )
        );
        $notifications->sendAll();
        return Response::success('Mensaje enviado');
    }

}
