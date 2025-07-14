import React, { useState } from 'react';
import styles from './EsqueciSenha.module.css';
import finanTrackLogo from '../assets/logo.png';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const emailValid = email.trim() !== '' && email.includes('@');
    
    if (!emailValid) {
      setError('Por favor, informe um email válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/forgot_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao enviar instruções de redefinição de senha.');
      }
      alert('Instruções para a redefinição de senha foram enviadas para o seu email!');
      setEmail('');
    } catch (err) {
      setError(err.message);
    }

  };

  return (
    <main className={styles.esqueciSenhaContainer} role="main" aria-label="Tela de Esqueci a Senha">
      <section className={styles.esqueciSenhaBox}>
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
          <button type="submit" className={styles.submitButton} aria-label="Enviar instruções para redefinição de senha">
            <span className={`material-icons ${styles.materialIcons}`} aria-hidden="true">Enviar</span>
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
