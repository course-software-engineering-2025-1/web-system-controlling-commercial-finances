import React, { useState } from 'react';
import styles from'./MetasFinanceiras.module.css';

const MetasFinanceiras = () => {
  const [meta, setMeta] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar lógica para salvar as metas
    console.log(`Meta: ${meta}, Valor: ${valor}`);
  };

  return (
    <div className="container">
      <h1>Inserir Metas Financeiras</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="meta">Nome da Meta:</label>
          <input
            type="text"
            id="meta"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valor">Valor da Meta:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Meta</button>
      </form>
    </div>
  );
};

export default MetasFinanceiras;
