import React, { useState } from 'react';

/**
 * Importar Google Fonts e Material Icons no index.html ou via Helmet:
 * &lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" /&gt;
 * &lt;link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /&gt;
 */

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
        .transaction-management-container {
          max-width: 1100px;
          margin: 24px auto;
          padding: 0 16px 48px;
        }
        h1 {
          color: #3b82f6; /* Alterado para azul */
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 24px;
          user-select:none;
        }
        form {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.05);
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 32px;
          align-items: flex-end;
        }
        label {
          display: block;
          font-weight: 600;
          margin-bottom: 6px;
        }
        input[type="text"], input[type="number"], input[type="date"], select {
          width: 100%;
          max-width: 220px;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          font-size: 1rem;
          transition: border-color 0.3s ease;
        }
        input[type="text"]:focus, input[type="number"]:focus, input[type="date"]:focus, select:focus {
          outline: none;
          border-color: #3b82f6; /* Alterado para azul */
          box-shadow: 0 0 8px #3b82f6cc; /* Alterado para azul */
        }
        .checkbox-container {
          max-width: 220px;
          display: flex;
          align-items: center;
          gap: 10px;
          user-select:none;
        }
        button {
          background: #3b82f6; /* Alterado para azul */
          color: white;
          padding: 14px 24px;
          border: none;
          border-radius: 16px;
          cursor: pointer;
          font-weight: 700;
          font-size: 1rem;
          min-width: 120px;
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
          width: 100%;
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
          vertical-align: middle;
        }
        tbody tr:hover {
          background: #e0f2fe; /* Alterado para azul claro */
          cursor: pointer;
        }
        .amount {
          font-weight: 700;
        }
        .amount.positive {
          color: #3b82f6; /* Alterado para azul */
        }
        .amount.negative {
          color: #ef4444;
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
          font-size: 15px;
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
          input[type="text"], input[type="number"], input[type="date"], select, button {
            max-width: 100%;
            width: 100%;
          }
          .checkbox-container {
            max-width: 100%;
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

      <section className="transaction-management-container" aria-label="Gerenciamento de transações financeiras">
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
          <div className="checkbox-container">
            <input
              id="isRecurring"
              name="isRecurring"
              type="checkbox"
              checked={form.isRecurring}
              onChange={handleChange}
            />
            <label htmlFor="isRecurring">Transação Recorrente</label>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button type="submit">{editing ? 'Salvar' : 'Adicionar'}</button>
            {editing && (
              <button type="button" className="cancel" onClick={resetForm} aria-label="Cancelar edição">
                Cancelar
              </button>
            )}
          </div>
          {error && <div className="error-message" role="alert">{error}</div>}
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
                      <td data-label="Valor" className={`amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                        {tx.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
                      </td>
                      <td className="actions" data-label="Ações">
                        <span 
                          role="button" 
                          tabIndex={0}
                          className="material-icons edit"
                          aria-label={`Editar transação ${tx.description}`}
                          onClick={() => handleEdit(tx)}
                          onKeyDown={(e) => e.key === 'Enter' && handleEdit(tx)}
                        >editar</span>
                        <span 
                          role="button" 
                          tabIndex={0}
                          className="material-icons delete"
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
    </>
  );
}
