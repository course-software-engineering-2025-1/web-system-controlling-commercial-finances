import React, { useState } from 'react';

/**
 * Import no seu arquivo index.html ou no seu App.jsx (Helmet):
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
 */

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailValid = email.trim() !== '' && email.includes('@');
    const passwordValid = password.length >= 6;

    if (!emailValid) {
      setError('Por favor, informe um email válido.');
      return;
    }
    if (!passwordValid) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    // Simular login bem-sucedido
    alert('Login efetuado com sucesso! (Simulação)');
    // Aqui chamaria API para autenticação e navegação
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body, html, #root {
          margin: 0; padding: 0; height: 100%;
          font-family: 'Inter', sans-serif;
          background: linear-gradient(135deg, #1e3a8a, #111827);
          color: #f3f4f6;
        }
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px;
        }
        .login-box {
          background: rgba(17, 24, 39, 0.85);
          backdrop-filter: blur(14px);
          border-radius: 16px;
          max-width: 400px; width: 100%;
          padding: 32px 28px;
          box-shadow: 0 16px 32px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: center;
        }
        .logo {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #60a5fa, #2563eb);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          user-select: none;
        }
        form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        label {
          font-weight: 600;
          margin-bottom: 8px;
          color: #e5e7eb;
        }
        input[type="email"], input[type="password"] {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid #4b5563;
          outline: none;
          font-size: 1rem;
          font-weight: 400;
          color: #f3f4f6;
          background-color: #374151;
          transition: box-shadow 0.3s ease;
        }
        input[type="email"]::placeholder,
        input[type="password"]::placeholder {
          color: #9ca3af;
        }
        input[type="email"]:focus,
        input[type="password"]:focus {
          box-shadow: 0 0 8px #60a5facc;
          border-color: #2563eb;
        }
        button[type="submit"] {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          color: #f3f4f6;
          font-size: 1.15rem;
          font-weight: 700;
          padding: 16px;
          border-radius: 16px;
          cursor: pointer;
          border: none;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        button[type="submit"]:hover,
        button[type="submit"]:focus {
          transform: translateY(-3px);
          box-shadow: 0 12px 24px rgba(37, 99, 235, 0.7);
          outline: none;
        }
        .forgot-password {
          font-size: 0.9rem;
          color: #93c5fd;
          text-align: right;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .forgot-password:hover,
        .forgot-password:focus {
          color: #bfdbfe;
          outline: none;
          text-decoration: underline;
        }
        .material-icons { font-size: 20px; }
        .error-message {
          background-color: #dc2626;
          color: #f3f4f6;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          user-select: none;
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px);} to { opacity: 1; transform: translateY(0);} }
        @media (max-width: 440px) {
          .login-box { margin: 16px; padding: 28px 20px; }
          button[type="submit"] { font-size: 1rem; padding: 14px; }
          .logo { font-size: 2rem; }
        }
      `}</style>

      <main className="login-container" role="main" aria-label="Tela de Login do Sistema Financeiro">
        <section className="login-box">
          <h1 className="logo" aria-label="Logo do Sistema Financeiro">App Finanças</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-required="true"
                autoComplete="username"
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-required="true"
                minLength={6}
                autoComplete="current-password"
              />
            </div>
            <a
              href="#"
              tabIndex={0}
              className="forgot-password"
              onClick={(e) => { e.preventDefault(); alert('Funcionalidade de recuperação de senha (Simulação)'); }}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alert('Funcionalidade de recuperação de senha (Simulação)'); } }}
            >
              Esqueceu sua senha?
            </a>
            <button type="submit" aria-label="Entrar no sistema">
              <span className="material-icons" aria-hidden="true">Entrar</span>
            </button>
            {error && (
              <div className="error-message" role="alert" aria-live="assertive">
                {error}
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}
