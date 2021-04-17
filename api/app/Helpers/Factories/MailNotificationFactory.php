<?php

namespace App\Helpers\Factories;

use App\Exceptions\Envios\EnvioException;
use App\Exceptions\Notifications\MailNotificationException;
use App\Helpers\MailNotifications\Contact;

class MailNotificationFactory {

    /**
     *
     */
    public static function init($type, $user){


        switch($type) {
            case 'contact':
                return new Contact($user);
            break;
            default:
                throw new MailNotificationException(["La notificación via mail del tipo '". $type . "' no existe"]);
            break;
        }

    }
}
