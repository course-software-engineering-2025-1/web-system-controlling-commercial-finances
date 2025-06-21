<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'cpf' => 'required|unique:users',
            'password' => 'required|string',
            'role' => 'required|in:comerciante,funcionario',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return response()->json(['user' => $user], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Credenciais inválidas'], 401);
        }

        return response()->json(['token' => $token]);
    }

    public function me()
    {
        return response()->json(JWTAuth::parseToken()->authenticate());
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logout com sucesso']);
    }
}
