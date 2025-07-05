<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        Log::info('Entrou no método register: ' . json_encode($request->all()));

        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'comerciante'; // Definindo o papel como 'comerciante'

        $user = User::create($data);

        if (!$user) {
            return response()->json(['error' => 'Erro ao criar usuário'], 500);
        }

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

    public function forgotPassword(Request $request){
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Aqui você pode implementar a lógica para enviar um e-mail de redefinição de senha
        // Por exemplo, gerar um token de redefinição e enviá-lo por e-mail

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Instruções para redefinir a senha foram enviadas para o seu e-mail.'])
            : response()->json(['message' => 'Erro ao enviar o e-mail de redefinição de senha.'], 500);
        // Aqui você pode usar um serviço de e-mail para enviar o link de redefinição
        // Por exemplo, usando o Mail::to($user->email)->send(new ResetPassword

        // Exemplo simples de resposta
        // Você deve substituir isso pela lógica real de envio de e-mail


        return response()->json(['message' => 'Instruções para redefinir a senha foram enviadas para o seu e-mail.']);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'token' => 'required',
            'password' => 'required|string|confirmed',
        ]);

        // Aqui você pode implementar a lógica para redefinir a senha
        // Por exemplo, verificar o token e atualizar a senha do usuário

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Senha redefinida com sucesso.'])
            : response()->json(['message' => 'Erro ao redefinir a senha.'], 500);
    }

    public function registerFuncionario(Request $request)
    {
        Log::info('Entrou no método registerFuncionario: ' . json_encode($request->all()));

        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6'
        ]);

        $data['password'] = Hash::make($data['password']);

        $data['role'] = 'funcionario'; // Definindo o papel como 'funcionario'

        $user = User::create($data);

        if (!$user) {
            return response()->json(['error' => 'Erro ao criar usuário'], 500);
        }

        return response()->json(['user' => $user], 201);
    }

}
