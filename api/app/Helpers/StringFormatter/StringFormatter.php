<?php

namespace App\Helpers\StringFormatter;

class StringFormatter
{

    public static function stringToUrlString(string $text): string
    {
        $s = preg_replace("/á|à|â|ã|ª/", "a", $text);
        $s = preg_replace("/Á|À|Â|Ã/", "A", $s);
        $s = preg_replace("/é|è|ê/", "e", $s);
        $s = preg_replace("/É|È|Ê/", "E", $s);
        $s = preg_replace("/í|ì|î/", "i", $s);
        $s = preg_replace("/Í|Ì|Î/", "I", $s);
        $s = preg_replace("/ó|ò|ô|õ|º/", "o", $s);
        $s = preg_replace("/Ó|Ò|Ô|Õ/", "O", $s);
        $s = preg_replace("/ú|ù|û/", "u", $s);
        $s = preg_replace("/Ú|Ù|Û/", "U", $s);
        $s = str_replace(" ", "-", $s);
        $s = str_replace("ñ", "n", $s);
        $s = str_replace("Ñ", "N", $s);
        $s = str_replace("'", "", $s);
        $s = str_replace('"', '', $s);
        $s = str_replace('.', '', $s);
        $s = preg_replace('/[^a-zA-Z0-9_.-]/', '', $s);
        return strtolower($s);
    }
}
