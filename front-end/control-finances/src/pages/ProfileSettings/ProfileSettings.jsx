import React, { useState, useEffect } from 'react';
import styles from './ProfileSettings.module.css';

const initialProfile = {
  name: 'José Silva',
  email: 'jose@example.com',
  password: '',
  theme: 'light',
  notificationsEnabled: true,
};

export default function ProfileSettings() {
  const [profile, setProfile] = useState(initialProfile);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(user => {
        setProfile({
          name: user.name,
          email: user.email,
          password: '',
          theme: user.theme || 'light',
          notificationsEnabled: user.notificationsEnabled ?? true,
        });
      })
      .catch(err => console.error('Erro ao carregar perfil:', err));
  }, []);


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

  const handleSubmit = async (e) => {
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

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/profile', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        password: profile.password || undefined,
        password_confirmation: passwordConfirm || undefined,
        theme: profile.theme,
        notificationsEnabled: profile.notificationsEnabled,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Erro ao salvar dados.');
    }

    setMsg('Configurações salvas com sucesso!');
    setProfile(prev => ({ ...prev, password: '' }));
    setPasswordConfirm('');
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <section className={styles['profile-settings-container']} aria-label="Configurações do Perfil do Usuário">
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

        <div className={styles['checkbox-group']}>
          <input 
            id="notificationsEnabled" 
            name="notificationsEnabled" 
            type="checkbox" 
            checked={profile.notificationsEnabled} 
            onChange={handleChange} 
          />
          <label htmlFor="notificationsEnabled">Receber notificações</label>
        </div>

        {msg && <div className={styles.message} role="alert">{msg}</div>}
        {error && <div className={styles.error} role="alert">{error}</div>}

        <button type="submit" aria-label="Salvar configurações">
          <span className="material-icons" aria-hidden="true" style={{verticalAlign:'middle', marginRight:'8px'}}></span>
          Salvar Configurações
        </button>
      </form>
    </section>
  );
}