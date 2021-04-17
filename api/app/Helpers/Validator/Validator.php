<?php
namespace App\Helpers\Validator;

use App\Exceptions\ValidatorException;

class Validator{

    public static function validator($data, $conditions, $messages = []){
        $validate = \Validator::make($data, $conditions, $messages);
        if ($validate->fails())
            throw new ValidatorException("Error al validar datos", self::errores($validate->errors()));
    }


    protected static function errores($arreglo_validator){
        $arreglo = json_decode(json_encode($arreglo_validator), true);
        $errores = array();
        foreach($arreglo as $error_por_tipo)
            foreach($error_por_tipo as $error)
                array_push($errores, $error);
        return $errores;
    }
}
