<?php
namespace App\Exceptions;
 
use Exception;

abstract class ExceptionManager extends Exception{
    protected $code, $errors;

    public function __construct($code, $message, $errors){
        parent::__construct($message);
        $this->code = $code;
        $this->errors = $errors;
    }

    public function getErrorCode(){
        return $this->code;
    }
    public function getErrors(){
        return $this->errors;
    }
       
}