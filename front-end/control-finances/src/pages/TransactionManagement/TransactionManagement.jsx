import React, { useState } from 'react';
import styles from './TransactionManagement.module.css';

const initialAccounts = [
  { id: 1, name: 'Conta Corrente' },
  { id: 2, name: 'Poupança' },
  { id: 3, name: 'Cartão de Crédito' },
];

const initialCategories = [
  { id: 1, name: 'Alimentação' },
  { id: 2, name: 'Transporte' },
  { id: 3, name: 'Saúde' },
  { id: 4, name: 'Salário' },
  { id: 5, name: 'Outros' },
];

const initialTransactions = [
  { id: 1, accountId: 1, amount: -250.00, category: 'Alimentação', subcategory: 'Mercado', description: 'Compra Mercado', date: '2024-06-20', type: 'expense', location: 'Supermercado XYZ', isRecurring: false },
  { id: 2, accountId: 2, amount: 1200.00, category: 'Salário', subcategory: '', description: 'Recebimento Mensal', date: '2024-06-21', type: 'income', location: '', isRecurring: true },
];

export default function TransactionManagement() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [form, setForm] = useState({
    id: null,
    accountId: '',
    amount: '',
    category: '',
    subcategory: '',
    description: '',
    date: '',
    location: '',
    isRecurring: false,
  });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setForm({
      id: null,
      accountId: '',
      amount: '',
      category: '',
      subcategory: '',
      description: '',
      date: '',
      location: '',
      isRecurring: false,
    });
    setEditing(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({...form, [name]: type === 'checkbox' ? checked : value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.accountId) {
      setError('Selecione uma conta.');
      return;
    }
    if (form.amount === '' || isNaN(form.amount)) {
      setError('Informe um valor válido.');
      return;
    }
    if (!form.category.trim()) {
      setError('Informe uma categoria.');
      return;
    }
    if (!form.description.trim()) {
      setError('Informe uma descrição.');
      return;
    }
    if (!form.date) {
      setError('Informe a data da transação.');
      return;
    }

    const newTransaction = {
      id: editing ? form.id : Date.now(),
      accountId: parseInt(form.accountId, 10),
      amount: parseFloat(form.amount),
      category: form.category,
      subcategory: form.subcategory,
      description: form.description,
      date: form.date,
      type: parseFloat(form.amount) > 0 ? 'income' : 'expense',
      location: form.location,
      isRecurring: form.isRecurring,
    };

    if (editing) {
      setTransactions(transactions.map(tx => tx.id === newTransaction.id ? newTransaction : tx));
    } else {
      setTransactions([newTransaction, ...transactions]);
    }
    resetForm();
  };

  const handleEdit = (tx) => {
    setForm({
      id: tx.id,
      accountId: tx.accountId.toString(),
      amount: tx.amount.toString(),
      category: tx.category,
      subcategory: tx.subcategory,
      description: tx.description,
      date: tx.date,
      location: tx.location,
      isRecurring: tx.isRecurring,
    });
    setEditing(true);
    setError('');
  };

  const handleDelete = (id) => {
    if(window.confirm('Confirma exclusão dessa transação?')) {
      setTransactions(transactions.filter(tx => tx.id !== id));
      if(editing && form.id === id) {
        resetForm();
      }
    }
  };

  return (
    <section className={styles['transaction-management-container']} aria-label="Gerenciamento de transações financeiras">
      <h1>Gestão de Transações</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="accountId">Conta</label>
          <select
            id="accountId"
            name="accountId"
            value={form.accountId}
            onChange={handleChange}
            required
            aria-required="true"
          >
            <option value="">Selecione a conta</option>
            {initialAccounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="amount">Valor (use negativo para despesa)</label>
          <input
            id="amount"
            name="amount"
            type="number"
            step="0.01"
            value={form.amount}
            onChange={handleChange}
            placeholder="0.00"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            aria-required="true"
          >
            <option value="">Selecione a categoria</option>
            {initialCategories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="subcategory">Subcategoria</label>
          <input
            id="subcategory"
            name="subcategory"
            type="text"
            value={form.subcategory}
            onChange={handleChange}
            placeholder="Opcional"
          />
        </div>
        <div>
          <label htmlFor="description">Descrição</label>
          <input
            id="description"
            name="description"
            type="text"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrição da movimentação"
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="date">Data</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            aria-required="true"
          />
        </div>
        <div>
          <label htmlFor="location">Localização</label>
          <input
            id="location"
            name="location"
            type="text"
            value={form.location}
            onChange={handleChange}
            placeholder="Local da transação (opcional)"
          />
        </div>
        <div className={styles['checkbox-container']}>
          <input
            id="isRecurring"
            name="isRecurring"
            type="checkbox"
            checked={form.isRecurring}
            onChange={handleChange}
          />
          <label htmlFor="isRecurring">Transação Recorrente</label>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', flexWrap: 'wrap' }}>
          <button type="submit">{editing ? 'Salvar' : 'Adicionar'}</button>
          {editing && (
            <button type="button" className={styles.cancel} onClick={resetForm} aria-label="Cancelar edição">
              Cancelar
            </button>
          )}
        </div>
        {error && <div className={styles['error-message']} role="alert">{error}</div>}
      </form>

      <section aria-label="Lista de transações registradas">
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Data</th>
              <th>Conta</th>
              <th>Categoria</th>
              <th>Valor</th>
              <th aria-label="Ações">Ações</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="6" style={{textAlign: 'center', padding: '16px'}}>Nenhuma transação registrada</td>
              </tr>
            ) : (
              transactions.map(tx => {
                const accountName = initialAccounts.find(acc => acc.id === tx.accountId)?.name || 'N/A';
                return (
                  <tr key={tx.id}>
                    <td data-label="Descrição">{tx.description}</td>
                    <td data-label="Data">{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                    <td data-label="Conta">{accountName}</td>
                    <td data-label="Categoria">{tx.category}</td>
                    <td data-label="Valor" className={`${styles.amount} ${tx.amount > 0 ? styles.positive : styles.negative}`}>
                      {tx.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                    </td>
                    <td className={styles.actions} data-label="Ações">
                      <span 
                        role="button" 
                        tabIndex={0}
                        className={`material-icons ${styles.edit}`}
                        aria-label={`Editar transação ${tx.description}`}
                        onClick={() => handleEdit(tx)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEdit(tx)}
                      >editar</span>
                      <span 
                        role="button" 
                        tabIndex={0}
                        className={`material-icons ${styles.delete}`}
                        aria-label={`Excluir transação ${tx.description}`}
                        onClick={() => handleDelete(tx.id)}
                        onKeyDown={(e) => e.key === 'Enter' && handleDelete(tx.id)}
                      >deletar</span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </section>
    </section>
  );
}