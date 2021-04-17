<?php
namespace App\Exceptions\Notifications;

use App\Exceptions\ExceptionManager;

class MailNotificationException extends ExceptionManager{

    public function __construct($errors){
        parent::__construct(400, "Error en Envios", $errors);
    }

}
