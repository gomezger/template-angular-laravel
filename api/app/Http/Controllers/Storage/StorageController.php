<?php

namespace App\Http\Controllers\Storage;

use App\Helpers\File\FileUploader;
use App\Helpers\Response\Response;
use App\Http\Controllers\Controller;
use App\Models\Users\User;
use App\Repositories\Users\UserRepo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StorageController extends Controller
{

    public function uploadImage(Request $request)
    {
        $file = $request->file('file', null);
        $disk = $request->input('disk', 'public');

        return Response::success(FileUploader::upload($file, $disk));
    }

    public function uploadPDF(Request $request)
    {
        $file = $request->file('file', null);
        $disk = $request->input('disk', 'public');

        return Response::success(FileUploader::upload($file, $disk));
    }
}
