<?php
namespace App\Exceptions;
 
use Exception;

class InvalidFileException extends ExceptionManager{

    public function __construct($errors){
        parent::__construct(400,'Error al subir imagen',$errors);
    }
       
}