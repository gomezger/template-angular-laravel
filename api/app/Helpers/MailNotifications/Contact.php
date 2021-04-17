<?php

namespace App\Helpers\MailNotifications;

class Contact extends MailNotifications
{

    public function __construct($user)
    {
        parent::__construct($user);
    }

    public function sendContactMessage($data)
    {
        return $this->insert($this->user, $this->email, 'Consulta desde la web', $this->name, 'mail-notification.contact', $data);
    }
}
