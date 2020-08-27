<?php
namespace App\Exceptions;
 
use Exception;

class ValidatorException extends ExceptionManager{

    public function __construct($mensaje, $errors){
        parent::__construct(400, $mensaje, $errors);
    }
       
}