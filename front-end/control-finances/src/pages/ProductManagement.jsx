import React, { useState } from 'react';

/**
 * Importar Google Fonts e Material Icons no index.html ou via Helmet:
 * &lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" /&gt;
 * &lt;link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" /&gt;
 */

const initialProducts = [
  { id: 1, name: 'Arroz 5kg', sku: 'ARZ005', price: 25.90, stock: 150, category: 'Alimentos' },
  { id: 2, name: 'Óleo de Soja 900ml', sku: 'OLE900', price: 7.80, stock: 320, category: 'Alimentos' },
  { id: 3, name: 'Sabonete Glicerinado', sku: 'SABGLI', price: 2.50, stock: 80, category: 'Higiene' },
];

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState({ id: null, name: '', sku: '', price: '', stock: '', category: '' });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setForm({ id: null, name: '', sku: '', price: '', stock: '', category: '' });
    setEditing(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  };

  const isPositiveNumber = (val) => !isNaN(val) && Number(val) >= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('Nome do produto é obrigatório.');
      return;
    }
    if (!form.sku.trim()) {
      setError('SKU é obrigatório.');
      return;
    }
    if (!isPositiveNumber(form.price)) {
      setError('Preço deve ser um número maior ou igual a zero.');
      return;
    }
    if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0) {
      setError('Estoque deve ser um número inteiro positivo.');
      return;
    }
    if (!form.category.trim()) {
      setError('Categoria é obrigatória.');
      return;
    }

    const newProduct = {
      id: editing ? form.id : Date.now(),
      name: form.name.trim(),
      sku: form.sku.trim(),
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10),
      category: form.category.trim(),
    };

    if (editing) {
      // Update existing product
      setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
    } else {
      // Add new product
      setProducts([...products, newProduct]);
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      sku: product.sku,
      price: product.price.toFixed(2),
      stock: product.stock.toString(),
      category: product.category,
    });
    setEditing(true);
    setError('');
  };

  const handleDelete = (id) => {
    if(window.confirm('Confirma exclusão do produto?')){
      setProducts(products.filter(p => p.id !== id));
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
        .product-management-container {
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
        input[type="text"], input[type="number"] {
          font-size: 1rem;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1px solid #d1d5db;
          width: 100%;
          max-width: 220px;
          transition: border-color 0.3s ease;
          -moz-appearance: textfield;
        }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
          -webkit-appearance: none; 
          margin: 0; 
        }
        input[type="text"]:focus, input[type="number"]:focus {
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
          font-size: 1rem;
          transition: background-color 0.25s ease, box-shadow 0.3s ease;
          min-width: 120px;
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
          width: 100%;
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
          input[type="text"], input[type="number"], button {
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

      <section className="product-management-container" aria-label="Gerenciamento de produtos">
        <h1>Gerenciamento de Produtos</h1>

        <section className="form-card" aria-label={editing ? 'Editar produto' : 'Adicionar novo produto'}>
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="name">Nome do Produto</label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nome do produto"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="sku">SKU</label>
              <input
                id="sku"
                type="text"
                name="sku"
                value={form.sku}
                onChange={handleChange}
                placeholder="Código SKU"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="price">Preço (R$)</label>
              <input
                id="price"
                type="number"
                name="price"
                value={form.price}
                min="0"
                step="0.01"
                onChange={handleChange}
                placeholder="0.00"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="stock">Estoque</label>
              <input
                id="stock"
                type="number"
                name="stock"
                value={form.stock}
                min="0"
                step="1"
                onChange={handleChange}
                placeholder="0"
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="category">Categoria</label>
              <input
                id="category"
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Categoria do produto"
                required
                aria-required="true"
              />
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

        <section className="list-card" aria-label="Lista de produtos cadastrados">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>SKU</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Categoria</th>
                <th aria-label="Ações">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{textAlign: 'center', padding: '16px'}}>Nenhum produto cadastrado.</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id}>
                    <td data-label="Nome">{product.name}</td>
                    <td data-label="SKU">{product.sku}</td>
                    <td data-label="Preço">{product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                    <td data-label="Estoque">{product.stock}</td>
                    <td data-label="Categoria">{product.category}</td>
                    <td data-label="Ações" className="actions">
                      <span 
                        role="button" 
                        tabIndex={0}
                        className="material-icons edit"
                        aria-label={`Editar produto ${product.name}`}
                        onClick={() => handleEdit(product)}
                        onKeyDown={(e) => e.key === 'Enter' && handleEdit(product)}
                      >editar</span>
                      <span 
                        role="button" 
                        tabIndex={0}
                        className="material-icons delete"
                        aria-label={`Excluir produto ${product.name}`}
                        onClick={() => handleDelete(product.id)}
                        onKeyDown={(e) => e.key === 'Enter' && handleDelete(product.id)}
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
