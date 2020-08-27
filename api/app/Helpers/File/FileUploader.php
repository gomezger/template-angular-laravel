<?php
namespace App\Helpers\File;

class FileUploader{
    
    public function __construct(){}

    public static function upload($file,$disk){
        $file_new_path = time().$file->hashName();
        \Storage::disk($disk)->put($file_new_path, \File::get($file));
        return $file_new_path;
    } 

}