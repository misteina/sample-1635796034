<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class TodoController extends Controller
{
    // Display a listing of the resource.

    public function index()
    {
        $todos = Cache::remember('todos', 3600, function () {
            return User::find(Auth::id())->todos;
        });

        return ['statusCode' => 200, 'message' => 'success', 'todos' => $todos];
    }



    // Store a newly created resource in storage.

    public function store(Request $request)
    {
        $request->validate([
            'note' => 'required|min:3|max:100',
            'deadline' => 'required|date'
        ]);

        $formData = $request->only(['note', 'deadline']);
        $formData['user_id'] = Auth::id();

        $todo = Todo::create($formData);

        if ($todo){
            Cache::forget('todos');
            return response()->json(['statusCode' => 200, 'message' => 'success', 'todo' => $todo], 200);
        }

        return response()->json(['statusCode' => 422, 'message' => 'failed'], 422);
    }



    // Update the specified resource in storage

    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'note' => 'required|min:3|max:100',
            'deadline' => 'required|date'
        ]);

        $todo->note = $request->note;
        $todo->deadline = $request->deadline;

        $todo->save();

        Cache::forget('todos');

        return response()->json(['statusCode' => 200, 'message' => 'success'], 200);
    }



    // Remove the specified resource from storage.

    public function destroy(Todo $todo)
    {
        Cache::forget('todos');
        
        $todo->delete();
    }
}
