import React, { useState } from 'react';
import styles from './Cadastro.module.css';
import finanTrackLogo from '../assets/logo.png';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailValid = email.trim() !== '' && email.includes('@');
    const nameValid = name.trim() !== '';
    const passwordValid = password.length >= 6;

    if (!nameValid) {
      setError('Por favor, informe seu nome.');
      return;
    }
    if (!emailValid) {
      setError('Por favor, informe um email válido.');
      return;
    }
    if (!passwordValid) {
      setError('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    try {

      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role: 'comerciante'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error (errorData.message || 'Erro ao cadastrar usuário.');
        return;
      }

      const data = await response.json();
      alert('Cadastro realizado com sucesso! (Simulação)');
      
    } catch (err) {
      setError(err.message);
    }

  };

  return (
    <main className={styles.cadastroContainer} role="main" aria-label="Tela de Cadastro do Sistema Financeiro">
      <section className={styles.cadastroBox}>
        <img 
          src={finanTrackLogo} 
          alt="Finan Track Logo" 
          className={styles.logoImage} 
        />
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div>
            <label className={styles.label} htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              className={styles.input}
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              aria-required="true"
              autoComplete="name"
            />
          </div>
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
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className={styles.submitButton} aria-label="Cadastrar no sistema">
            <span className={`material-icons ${styles.materialIcons}`} aria-hidden="true">Cadastrar</span>
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
