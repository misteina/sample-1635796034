<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Todo::all();
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'note' => 'required|min:3|max:100',
            'deadline' => 'required|date'
        ]);

        $formData = $request->only(['note', 'deadline']);

        $todo = Todo::create($formData);

        if ($todo){
            return response()->json(['statusCode' => 200, 'message' => 'success'], 200);
        }

        return response()->json(['statusCode' => 422, 'message' => 'failed'], 422);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Todo $todo)
    {
        $request->validate([
            'note' => 'required|min:3|max:100',
            'deadline' => 'required|date'
        ]);

        $todo->note = $request->note;
        $todo->deadline = $request->deadline;

        $todo->save();

        return response()->json(['statusCode' => 200, 'message' => 'success'], 200);
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Todo  $todo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
    }
}
