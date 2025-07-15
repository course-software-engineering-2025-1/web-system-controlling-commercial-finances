import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import finanTrackLogo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

        try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error (errorData.message || 'Erro ao fazer login. Tente novamente.');
      }
      const data = await response.json();
      // console.log('Login bem-sucedido:', data);

      localStorage.setItem('token', data.token);

      alert('Login efetuado com sucesso! (Simulação)');
    }
    catch (err) {
      setError(err.message);
    }

    navigate('/dashboard');
  };

  return (
    <main className={styles.loginContainer} role="main" aria-label="Tela de Login do Sistema Financeiro">
      <section className={styles.loginBox}>
        <img 
        src={finanTrackLogo} 
        alt="Finan Track Logo" 
        className={styles.logoImage} 
        />
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label className={styles.label} htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={styles.input}
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              autoComplete="username"
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              className={styles.input}
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
              minLength={6}
              autoComplete="current-password"
            />
          </div>
          <Link
            to="/esqueci-senha"
            tabIndex={0}
            className={styles.forgotPassword}
          >
            Esqueceu sua senha?
          </Link>
          <button type="submit" className={styles.submitButton} aria-label="Entrar no sistema">
            <span className={`material-icons ${styles.materialIcons}`} aria-hidden="true">Entrar</span>
          </button>
          {error && (
            <div className={styles.errorMessage} role="alert" aria-live="assertive">
              {error}
            </div>
          )}
          <div className={styles.registerPrompt}>
            <span>Ainda não tem cadastro? </span>
            <a 
              href="/cadastro" 
              className={styles.registerLink}>
              Clique aqui
            </a>
          </div>
        </form>
      </section>
    </main>
  );
}
