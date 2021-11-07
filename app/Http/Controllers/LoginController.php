<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function showPage()
    {
        return view('login');
    }


    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|alpha|min:3|max:20',
            'password' => 'required|min:3|max:30'
        ]);

        if (Auth::attempt($credentials))
        {
            $request->session()->regenerate();

            return response()->json(['statusCode' => 200, 'message' => 'success'], 200);
        }

        return response()->json(['statusCode' => 406, 'message' => 'Invalid credentials'], 406);
    }
}
