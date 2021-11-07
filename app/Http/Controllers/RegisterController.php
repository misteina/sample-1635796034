<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
    public function showPage()
    {
        return view('register');
    }
    

    public function register(Request $request)
    {

        $request->validate([
            'username' => 'required|alpha|min:3|max:20',
            'password' => 'required|confirmed|min:3|max:30'
        ]);

        $formData = $request->only(['username', 'password']);

        $formData['password'] = Hash::make($request->password);

        $user = User::create($formData);

        if ($user){
            return response()->json(['statusCode' => 200, 'message' => 'success'], 200);
        }
        return response()->json(['statusCode' => 422, 'message' => 'failed'], 422);
    }
}
