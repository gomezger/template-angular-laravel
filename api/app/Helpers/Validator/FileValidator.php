<?php
namespace App\Helpers\Validator;

use App\Helpers\Validator\Validator;
use App\Exceptions\InvalidFileException;

class FileValidator extends Validator{
    
    public static function validate($file,$condition){
        $validate = \Validator::make(['archivo'=>$file],['archivo'=>$condition]);
        if ($validate->fails())
            throw new InvalidFileException(self::errores($validate->errors()));
    } 
}