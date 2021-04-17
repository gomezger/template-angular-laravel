<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $from_mail, $to, $name, $subject, $data;



    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($from_mail, $subject, $name, $view, $data, $file = null)
    {
        $this->from_mail = $from_mail;
        $this->name = $name;
        $this->subject = $subject;
        $this->view = $view;
        $this->data = $data;
        $this->file = $file;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        if ( is_null($this->file) ){
            return $this->from($address = $this->from_mail, $name = $this->name)
                    ->view($this->view)
                    ->subject($this->subject)
                    ->with($this->data);
        } else {
            return $this->from($address = $this->from_mail, $name = $this->name)
                    ->view($this->view)
                    ->subject($this->subject)
                    ->with($this->data)
                    ->attachFromStorageDisk('files-attach', $this->file);
        }


    }
}
