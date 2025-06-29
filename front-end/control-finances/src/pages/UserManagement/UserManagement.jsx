import React, { useState } from 'react';
import styles from './UserManagement.module.css';

const initialUsers = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'Comerciante', status: 'Ativo' },
  { id: 2, name: 'Maria Souza', email: 'maria@example.com', role: 'Funcionário', status: 'Ativo' },
  { id: 3, name: 'Carlos Pereira', email: 'carlos@example.com', role: 'Funcionário', status: 'Inativo' },
];

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ id: null, name: '', email: '', role: 'Funcionário', status: 'Ativo' });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setForm({ id: null, name: '', email: '', role: 'Funcionário', status: 'Ativo' });
    setEditing(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Nome é obrigatório.');
      return;
    }
    if (!validateEmail(form.email)) {
      setError('Email inválido.');
      return;
    }
    if (!form.role) {
      setError('Selecione um papel.');
      return;
    }
    if (!form.status) {
      setError('Selecione um status.');
      return;
    }

    if (editing) {
      setUsers(users.map(u => u.id === form.id ? form : u));
    } else {
      const newUser  = { ...form, id: Date.now() };
      setUsers([...users, newUser ]);
    }
    resetForm();
  };

  const handleEdit = (user) => {
    setForm(user);
    setEditing(true);
    setError('');
  };

  const handleDelete = (id) => {
    if(window.confirm('Confirma exclusão do usuário?')){
      setUsers(users.filter(u => u.id !== id));
      if(editing && form.id === id){
        resetForm();
      }
    }
  };

  return (
    <section className={styles['user-management-container']} aria-label="Gerenciamento de usuários">
      <h1>Gerenciamento de Usuários</h1>

      <section className={styles['form-card']} aria-label={editing ? 'Editar usuário' : 'Adicionar novo usuário'}>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nome completo"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@dominio.com"
              required
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="role">Papel</label>
            <select id="role" name="role" value={form.role} onChange={handleChange} required aria-required="true">
              <option value="Comerciante">Comerciante</option>
              <option value="Funcionário">Funcionário</option>
            </select>
          </div>
          <div>
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange} required aria-required="true">
              <option value="Ativo">Ativo</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit">{editing ? 'Salvar' : 'Adicionar'}</button>
            {editing && (
              <button type="button" className={styles.cancel} onClick={resetForm} aria-label="Cancelar edição">
                Cancelar
              </button>
            )}
          </div>
        </form>
        {error && <div className={styles['error-message']} role="alert">{error}</div>}
      </section>

      <section className={styles['list-card']} aria-label="Lista de usuários cadastrados">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Papel</th>
              <th>Status</th>
              <th aria-label="Ações">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '16px'}}>Nenhum usuário cadastrado.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td data-label="Nome">{user.name}</td>
                  <td data-label="Email">{user.email}</td>
                  <td data-label="Papel">{user.role}</td>
                  <td data-label="Status">{user.status}</td>
                  <td data-label="Ações" className={styles.actions}>
                    <span 
                      role="button" 
                      tabIndex={0}
                      className={`material-icons ${styles.edit}`}
                      aria-label={`Editar usuário ${user.name}`}
                      onClick={() => handleEdit(user)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEdit(user)}
                    >editar</span>
                    <span 
                      role="button" 
                      tabIndex={0}
                      className={`material-icons ${styles.delete}`}
                      aria-label={`Excluir usuário ${user.name}`}
                      onClick={() => handleDelete(user.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handleDelete(user.id)}
                    >deletar</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
}