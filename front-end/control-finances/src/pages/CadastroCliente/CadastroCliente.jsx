import React, { useState } from 'react';
import styles from'./CadastroCliente.module.css'; 

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [numeroContato, setNumeroContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [historicoCompras, setHistoricoCompras] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nome,
      cpf,
      numeroContato,
      endereco,
      aniversario,
      historicoCompras,
    });
    // Adicione a lógica de envio aqui
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>CPF:</label>
          <input 
            type="text" 
            value={cpf} 
            onChange={(e) => setCpf(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Número de Contato:</label>
          <input 
            type="text" 
            value={numeroContato} 
            onChange={(e) => setNumeroContato(e.target.value)} 
            required 
          />
        </div>

        <div lassName='form-group'>
          <label>Endereço:</label>
          <input type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Aniversário:</label>
          <input 
            type="date" 
            value={aniversario} 
            onChange={(e) => setAniversario(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Histórico de Compras:</label>
          <textarea 
            value={historicoCompras} 
            onChange={(e) => setHistoricoCompras(e.target.value)} 
            rows="4" 
            required 
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroCliente;
