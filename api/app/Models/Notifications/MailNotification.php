<?php

namespace App\Models\Notifications;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailNotification extends Model
{
    use HasFactory;

    protected $table = 'mail_notifications';
    protected $fillable = ['id','from', 'to', 'subject', 'name', 'view', 'data','sent', 'file'];
}
