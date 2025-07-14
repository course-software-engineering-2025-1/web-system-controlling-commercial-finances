import { useState, useEffect } from 'react';
import styles from './UserManagement.module.css';


export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', email: '', role: 'Funcionário', status: 'Ativo' });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simula uma chamada para buscar usuários do backend
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/funcionarios', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao buscar usuários.');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUsers();
  }, []);

  const resetForm = () => {
    setForm({ id: null, name: '', email: '', role: 'Funcionário', status: '' });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    
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
    
    try {
      const token = localStorage.getItem('token')

      const payload ={
      name: form.name,
      email: form.email,
      role: form.role.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
      status: form.status
    };

    if (editing) {
      const response  = await fetch(`http://localhost:8000/api/funcionario/${form.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao atualizar usuário.');
      }
      const updatedUser = await response.json();
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      alert('Usuário atualizado com sucesso.');

    } else {      
      const response = await fetch('http://localhost:8000/api/register_funcionario', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization' :  ' Bearer ' + token
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error (errorData.message || 'Erro ao registrar funcionario.');
      }
      const data = await response.json();
      
      alert('Funcionário registrado com sucesso. Senha: ' + data.password);
      const newUser = { ...form, id: data.id };
      setUsers([...users, newUser]);
      //resetForm();
    }
  } catch (err) {
    setError(err.message);
  }
};

const handleEdit = (user) => {
  setForm({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === 'comerciante' ? 'Comerciante' : 'Funcionário',
    status: user.status === 'ativo' ? 'Ativo' : 'Inativo',
  });
  setEditing(true);
  setError('');
};


  const handleDelete = async (id) => {
    if(window.confirm('Confirma exclusão do usuário?')){
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/funcionario/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error( 'Erro ao excluir usuário.');
        }

        setUsers(users.filter(user => user.id !== id));

        if (editing && form.id === id) {
          resetForm();
          
        }

        alert('Usuário excluído com sucesso.');
      } catch (err) {
        setError(err.message);
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