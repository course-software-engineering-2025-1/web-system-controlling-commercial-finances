import React, { useState } from 'react';
import styles from './Login.module.css';

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

    alert('Login efetuado com sucesso! (Simulação)');
  };

  return (
    <main className={styles.loginContainer} role="main" aria-label="Tela de Login do Sistema Financeiro">
      <section className={styles.loginBox}>
        <h1 className={styles.logo} aria-label="Logo do Sistema Financeiro">App Finanças</h1>
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
          <a
            href="#"
            tabIndex={0}
            className={styles.forgotPassword}
            onClick={(e) => { e.preventDefault(); alert('Funcionalidade de recuperação de senha (Simulação)'); }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alert('Funcionalidade de recuperação de senha (Simulação)'); } }}
          >
            Esqueceu sua senha?
          </a>
          <button type="submit" className={styles.submitButton} aria-label="Entrar no sistema">
            <span className={`material-icons ${styles.materialIcons}`} aria-hidden="true">Entrar</span>
          </button>
          {error && (
            <div className={styles.errorMessage} role="alert" aria-live="assertive">
              {error}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}