<?php
namespace App\Helpers\Response;

class Response{

    /**
     * @message: string con un mensaje a compartir
     * @param1: tiene 3 posibilidades
     *  1) es una "key" (string) para el valor almacenado en $param2
     *  2) es un arreglo de keys (strings) para los valores almacenados en $param2
     *  3) es un arreglo de tuplas (key,valor) 
     *  4) si es nulo, no hay objetos a mostrar
     * @param2: es opcional, solo sirve si param1 corresponde a su opcion 1 o 2.
     *  1) es un "value" (any) para la key porporcionado en $param1
     *  2) es un arreglo de valores (any) para las keys almacenadas en $param1
     */
    public static function success($message, $param1=null, $param2=null){
        
        $response = array(
            "status" => "success",
            "code" => 200,
            "message" => $message
        );

        if(is_null($param1)){

            return $response;
        
        }elseif(is_array($param1) && is_null($param2)){
            
            return self::successWithObjects2($response, $param1);

        }elseif(is_array($param1) && is_array($param2)){
            
            return self::successWithObjects1($response, $param1, $param2);

        }else{
            return self::successWithObject($response,$param1,$param2);
        }        
    }

    private static function successWithObject($response, $name, $object){
        return array_merge($response,[$name => $object]);
    }

    private static function successWithObjects1($response, $names, $objects){
        return self::successWithObjects2($response, array_combine($names, $objects));
    }

    private static function successWithObjects2($response, $objects){
        return array_merge($response,$objects);
    }


    /**
     * @code: number
     * @message: string
     * @errors: string array
     */
    public static function error($code, $message, $errors){
        return array(
            "status" => "error",
            "code" => $code,
            "message" => $message,
            "errors" => $errors
        );
    }    
}