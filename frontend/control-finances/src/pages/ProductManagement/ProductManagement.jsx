import React, { useState, useEffect } from 'react';
import styles from './ProductManagement.module.css';

/*
const initialProducts = [
  { id: 1, name: 'Arroz 5kg', sku: 'ARZ005', price: 25.90, stock: 150, category: 'Alimentos' },
  { id: 2, name: 'Óleo de Soja 900ml', sku: 'OLE900', price: 7.80, stock: 320, category: 'Alimentos' },
  { id: 3, name: 'Sabonete Glicerinado', sku: 'SABGLI', price: 2.50, stock: 80, category: 'Higiene' },
];
*/

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: null, name: '', sku: '', price: '', stock: '', category: '' });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simula uma chamada para buscar produtos do backend
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/produtos', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao buscar produtos.');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  const resetForm = () => {
    setForm({ id: null, name: '', sku: '', price: '', stock: '', category: '' });
    setEditing(false);
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const isPositiveNumber = (val) => !isNaN(val) && Number(val) >= 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('name do produto é obrigatório.');
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
      nome: form.name.trim(),
      sku: form.sku.trim(),
      preco: parseFloat(form.price),
      estoque: parseInt(form.stock, 10),
      categoria: form.category.trim(),
    };

    if (editing) {
      const response = await fetch(`http://localhost:8000/api/produtos/${newProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao atualizar produto.');
        return;
      }
      
      const updatedProducts = products.map(p => (p.id === newProduct.id ? newProduct : p));
      setProducts(updatedProducts);
      alert('Produto atualizado com sucesso!');
    } else {
      const response = await fetch('http://localhost:8000/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erro ao cadastrar produto.');
        return;
      }

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      alert('Produto cadastrado com sucesso!');
    }
    resetForm();
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      name: product.nome,
      sku: product.sku,
      price: Number(product.preco).toFixed(2),
      stock: product.estoque.toString(),
      category: product.categoria,
    });
    setEditing(true);
    setError('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirma exclusão do produto?')) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8000/api/produtos/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Erro ao excluir produto.');
        }
        setProducts(products.filter(product => product.id !== id));
        alert('Produto excluído com sucesso.');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <section className={styles['product-management-container']} aria-label="Gerenciamento de produtos">
      <h1>Gerenciamento de Produtos</h1>

      <section className={styles['form-card']} aria-label={editing ? 'Editar produto' : 'Adicionar novo produto'}>
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
              <button type="button" className={styles.cancel} onClick={resetForm} aria-label="Cancelar edição">
                Cancelar
              </button>
            )}
          </div>
        </form>
        {error && <div className={styles['error-message']} role="alert">{error}</div>}
      </section>

      <section className={styles['list-card']} aria-label="Lista de produtos cadastrados">
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
                <td colSpan="6" style={{ textAlign: 'center', padding: '16px' }}>Nenhum produto cadastrado.</td>
              </tr>
            ) : (
              products.map(product => (
                <tr key={product.id}>
                  <td data-label="Nome">{product.nome}</td>
                  <td data-label="SKU">{product.sku}</td>
                  <td data-label="Preço">{product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                  <td data-label="Estoque">{product.estoque}</td>
                  <td data-label="Categoria">{product.categoria}</td>
                  <td data-label="Ações" className={styles.actions}>
                    <span
                      role="button"
                      tabIndex={0}
                      className={`material-icons ${styles.edit}`}
                      aria-label={`Editar produto ${product.name}`}
                      onClick={() => handleEdit(product)}
                      onKeyDown={(e) => e.key === 'Enter' && handleEdit(product)}
                    >editar</span>
                    <span
                      role="button"
                      tabIndex={0}
                      className={`material-icons ${styles.delete}`}
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
  );
}