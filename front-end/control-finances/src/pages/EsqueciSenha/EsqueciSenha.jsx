import React, { useState } from 'react';
import styles from './EsqueciSenha.module.css';
import finanTrackLogo from '../assets/logo.png';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const emailValid = email.trim() !== '' && email.includes('@');
    
    if (!emailValid) {
      setError('Por favor, informe um email válido.');
      return;
    }

    alert('Instruções para a redefinição de senha foram enviadas para o seu email! (Simulação)');
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
