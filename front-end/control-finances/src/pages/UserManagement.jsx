import React, { useState } from 'react';

/**
 * Importar Google Fonts e Material Icons no index.html ou via Helmet:
 * &lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" /&gt;
 * &lt;link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /&gt;
 */

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
    // Simples regex para validar email
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
      // Atualizar usuário existente
      setUsers(users.map(u => u.id === form.id ? form : u));
    } else {
      // Adicionar novo usuário
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
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; 
          padding: 0; 
          height: 100%;
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          color: #111827;
        }
        .user-management-container {
          max-width: 1100px;
          margin: 24px auto;
          padding: 0 16px 48px;
        }
        h1 {
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 24px;
          color: #3b82f6; /* Alterado para azul */
          user-select:none;
        }
        .form-card, .list-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 12px rgb(0 0 0 / 0.05);
          padding: 24px;
          margin-bottom: 32px;
        }
        form {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: flex-end;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
        }
        input[type="text"], input[type="email"], select {
          font-size: 1rem;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          width: 100%;
          max-width: 280px;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus, input[type="email"]:focus, select:focus {
          outline: none;
          border-color: #3b82f6; /* Alterado para azul */
          box-shadow: 0 0 8px #3b82f6cc; /* Alterado para azul */
        }
        button {
          background: #3b82f6; /* Alterado para azul */
          color: white;
          padding: 14px 24px;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-weight: 700;
          font-size: rem;
          transition: background-color 0.25s ease, box-shadow 0.3s ease;
        }
        button:hover, button:focus {
          background: #1e3a8a; /* Alterado para azul */
          box-shadow: 0 10px 20px rgba(59, 130, 246, 0.5);
          outline: none;
        }
        button.cancel {
          background: #ef4444;
        }
        button.cancel:hover, button.cancel:focus {
          background: #b91c1c;
        }
        .error-message {
          color: #b91c1c;
          font-weight: 600;
          margin-top: 8px;
          user-select:none;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }
        thead {
          background: #bfdbfe; /* Alterado para azul claro */
          user-select:none;
        }
        th, td {
          padding: 14px 18px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        tbody tr:hover {
          background: #e0f2fe; /* Alterado para azul claro */
          cursor: pointer;
        }
        .actions {
          display: flex;
          gap: 16px;
        }
        .material-icons {
          cursor: pointer;
          vertical-align: middle;
          color: #3b82f6; /* Alterado para azul */
          transition: color 0.25s ease;
        }
        .material-icons.edit:hover {
          color: #1e3a8a; /* Alterado para azul */
        }
        .material-icons.delete:hover {
          color: #ef4444;
        }

        @media (max-width: 640px) {
          form {
            flex-direction: column;
            align-items: stretch;
          }
          input[type="text"], input[type="email"], select, button {
            max-width: 100%;
            width: 100%;
          }
          .actions {
            justify-content: flex-start;
          }
          table, thead, tbody, th, td, tr {
            display: block;
          }
          thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
          }
          tbody tr {
            margin: 0 0 15px 0;
            border-radius: 16px;
            background: #f9fafb;
            padding: 10px 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          tbody tr td {
            border: none;
            padding: 8px 10px;
            position: relative;
            padding-left: 50%;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          tbody tr td::before {
            content: attr(data-label);
            position: absolute;
            left: 15px;
            font-weight: 600;
            color: #4b5563;
            white-space: nowrap;
          }
        }
      `}</style>
      <section className="user-management-container" aria-label="Gerenciamento de usuários">
        <h1>Gerenciamento de Usuários</h1>

        <section className="form-card" aria-label={editing ? 'Editar usuário' : 'Adicionar novo usuário'}>
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
                <button type="button" className="cancel" onClick={resetForm} aria-label="Cancelar edição">
                  Cancelar
                </button>
              )}
            </div>
          </form>
          {error && <div className="error-message" role="alert">{error}</div>}
        </section>

        <section className="list-card" aria-label="Lista de usuários cadastrados">
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
                    <td data-label="Ações" className="actions">
                      <span 
                        role="button" 
                        tabIndex={0}
                        className="material-icons edit"
                        aria-label={`Editar usuário ${user.name}`}
                        onClick={() => handleEdit(user)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEdit(user)}
                      >editar</span>
                      <span 
                        role="button" 
                        tabIndex={0}
                        className="material-icons delete"
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
    </>
  );
}
