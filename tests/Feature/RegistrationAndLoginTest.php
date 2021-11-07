<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\DB;

final class RegistrationAndLoginTest extends TestCase
{

    public function test_refreshTables()
    {
        DB::unprepared('SET FOREIGN_KEY_CHECKS = 0;TRUNCATE TABLE users;TRUNCATE TABLE todos;SET FOREIGN_KEY_CHECKS = 1;');

        $this->assertTrue(true);
    }


    
    public function test_user_registration()
    {
        $response = $this->post('/register', ['username' => 'Enyinna', 'password' => 'password', 'password_confirmation' => 'password']);

        $response->assertStatus(200);
    }


   
    public function test_user_login()
    {
        $response = $this->post('/login', ['username' => 'Enyinna', 'password' => 'password']);

        $response->assertStatus(200);
    }



    public function test_add_todo()
    {
        $user = User::find(1);

        Auth::login($user);

        $response = $this->post('/todos', ['note' => 'Enyinna note', 'deadline' => '2021-01-01 00:00:01']);

        $response->assertStatus(200);
    }



    public function test_update_todo()
    {
        $user = User::find(1);

        Auth::login($user);

        $response = $this->put('/todos/1', ['note' => 'Enyinna note updated', 'deadline' => '2021-01-01 00:00:01']);

        $response->assertStatus(200);
    }



    public function test_list_todos()
    {
        $user = User::find(1);

        Auth::login($user);

        $response = $this->get('/todos');

        $response->assertJsonFragment(['user_id' => 1]);

    }
    

    public function test_delete_todo()
    {
        $user = User::find(1);

        Auth::login($user);

        $response = $this->delete('/todos/1');

        $response->assertStatus(200);
    }

}