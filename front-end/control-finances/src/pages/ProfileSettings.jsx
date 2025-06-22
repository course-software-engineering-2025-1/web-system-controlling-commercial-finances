import React, { useState } from 'react';

/**
 * Importar Google Fonts e Material Icons no index.html ou via Helmet:
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
 */

const initialProfile = {
  name: 'José Silva',
  email: 'jose@example.com',
  password: '',
  theme: 'light', // light or dark
  notificationsEnabled: true,
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState(initialProfile);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg('');
    setError('');

    if (!profile.name.trim()) {
      setError('Nome é obrigatório.');
      return;
    }
    if (!profile.email.trim() || !/\S+@\S+\.\S+/.test(profile.email)) {
      setError('Email inválido.');
      return;
    }
    if (profile.password) {
      if (profile.password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres.');
        return;
      }
      if (profile.password !== passwordConfirm) {
        setError('As senhas não coincidem.');
        return;
      }
    }

    // Simulação de salvamento
    setMsg('Configurações salvas com sucesso!');
    setProfile(prev => ({ ...prev, password: '' }));
    setPasswordConfirm('');
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; 
          padding: 0; 
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          color: #111827;
          min-height: 100vh;
        }

        .profile-settings-container {
          max-width: 600px;
          margin: 32px auto;
          padding: 24px 16px 48px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.05);
        }

        h1 {
          font-weight: 700;
          font-size: 2rem;
          color: #3b82f6; /* Alterado para azul */
          margin-bottom: 24px;
          user-select:none;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        label {
          font-weight: 600;
          margin-bottom: 8px;
          display: block;
          user-select:none;
        }

        input[type="text"],
        input[type="email"],
        input[type="password"],
        select {
          width: 100%;
          padding: 12px 16px;
          font-size: 1rem;
          border-radius: 12px;
          border: 1px solid #d1d5db;
          transition: border-color 0.3s ease;
          outline-offset: 2px;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="password"]:focus,
        select:focus {
          border-color: #3b82f6; /* Alterado para azul */
          box-shadow: 0 0 6px #3b82f6cc; /* Alterado para azul */
        }

        .checkbox-group {
          display: flex;
          align-items: center;
          gap: 12px;
          user-select:none;
        }

        button {
          background: #3b82f6; /* Alterado para azul */
          color: white;
          border: none;
          border-radius: 16px;
          padding: 14px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease, box-shadow 0.3s ease;
        }

        button:hover,
        button:focus {
          background: #1e3a8a; /* Alterado para azul */
          outline: none;
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.5);
        }

        .message {
          color: #3b82f6; /* Alterado para azul */
          background: #bfdbfe; /* Alterado para azul claro */
          border-radius: 12px;
          padding: 12px 16px;
          font-weight: 600;
          user-select:none;
        }

        .error {
          color: #b91c1c;
          background: #fee2e2;
          border-radius: 12px;
          padding: 12px 16px;
          font-weight: 600;
          user-select:none;
        }

        @media (max-width: 480px) {
          .profile-settings-container {
            margin: 16px;
            padding: 20px 16px 40px;
          }
        }
      `}</style>

      <section className="profile-settings-container" aria-label="Configurações do Perfil do Usuário">
        <h1>Configurações do Perfil</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">Nome Completo</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              value={profile.name} 
              onChange={handleChange} 
              required 
              aria-required="true"
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={profile.email} 
              onChange={handleChange} 
              required 
              aria-required="true"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password">Nova Senha (deixe em branco para manter)</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              value={profile.password} 
              onChange={handleChange} 
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="passwordConfirm">Confirmar Nova Senha</label>
            <input 
              id="passwordConfirm" 
              name="passwordConfirm" 
              type="password" 
              value={passwordConfirm} 
              onChange={handlePasswordConfirmChange} 
              autoComplete="new-password"
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="theme">Tema</label>
            <select id="theme" name="theme" value={profile.theme} onChange={handleChange}>
              <option value="light">Claro</option>
              <option value="dark">Escuro</option>
            </select>
          </div>

          <div className="checkbox-group">
            <input 
              id="notificationsEnabled" 
              name="notificationsEnabled" 
              type="checkbox" 
              checked={profile.notificationsEnabled} 
              onChange={handleChange} 
            />
            <label htmlFor="notificationsEnabled">Receber notificações</label>
          </div>

          {msg && <div className="message" role="alert">{msg}</div>}
          {error && <div className="error" role="alert">{error}</div>}

          <button type="submit" aria-label="Salvar configurações">
            <span className="material-icons" aria-hidden="true" style={{verticalAlign:'middle', marginRight:'8px'}}>
            </span>
            Salvar Configurações
          </button>
        </form>
      </section>
    </>
  );
}
