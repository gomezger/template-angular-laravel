<?php

namespace App\Helpers\MailNotifications;

use App\Mail\AvisoMail;
use App\Repositories\Avisos\AvisosRepo;
use App\Repositories\Notifications\MailNotification as MailNotificationRepo;
use Illuminate\Support\Facades\Mail;

class MailNotifications
{

    protected  $support;
    protected  $email;
    protected  $name;
    protected  $user;

    public function __construct(string $user)
    {
        $this->email = config('mail.from.address');
        $this->name = config('mail.from.name');
        $this->support = config('mail.from.support');
        $this->user = $user;
    }

    public function insert($from, $to, $subject, $name, $view, $data, $file = NULL)
    {
        MailNotificationRepo::insert(
            array(
                'from' => $from,
                'to' => $to,
                'subject' => $subject,
                'name' => $name,
                'view' => $view,
                'data' => json_encode($data),
                'file' => $file
            )
        );
    }

    public function fatal_error($subject, $data)
    {
        MailNotificationRepo::insert(
            array(
                'from' => $this->email,
                'to' => $this->support,
                'subject' => $subject,
                'name' => $this->name,
                'view' => 'avisos.error.mail',
                'data' => json_encode($data)
            )
        );
    }

    /**
     * Envia todos los mails encolados (eestan en espera)
     */
    public function sendAll()
    {
        $avisos = MailNotificationRepo::notSent();
        foreach ($avisos as $aviso) {
            if ($this->send($aviso->from, $aviso->to, $aviso->subject, $aviso->name, $aviso->view, json_decode($aviso->data, true), $aviso->file))
                AvisosRepo::update(
                    array(
                        "id" => $aviso->id,
                        "sent" => true
                    )
                );
        }
    }

    private function send($from, $to, $subject, $name, $view, $data, $file)
    {
        Mail::to($to)->send(new AvisoMail($from, $subject, $name, $view, $data, $file));
        return true;
    }
}
