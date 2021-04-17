<?php

namespace App\Repositories\Notifications;

use App\models\Notifications\MailNotification as MailNotificationModel;

class MailNotification {

    public static function find($id){
        return MailNotificationModel::find($id);
    }

    public static function all(){
        return MailNotificationModel::all();
    }

    public static function notSent(){
        return MailNotificationModel::where('sent','0')->get();
    }

    public static function insert($params){
        return MailNotificationModel::create($params);
    }

    public static function update($params){
        $MailNotificationModel = self::find($params['id']);
        $MailNotificationModel->update($params);
        return self::find($params['id']);
    }

}
