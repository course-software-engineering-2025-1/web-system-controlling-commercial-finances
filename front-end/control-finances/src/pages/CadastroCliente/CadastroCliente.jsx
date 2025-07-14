import React, { useState } from 'react';
import styles from'./CadastroCliente.module.css'; 

const CadastroCliente = () => {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [numeroContato, setNumeroContato] = useState('');
  const [endereco, setEndereco] = useState('');
  const [aniversario, setAniversario] = useState('');
  const [historicoCompras, setHistoricoCompras] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
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
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:8000/api/cadastrar-cliente', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization' :  ' Bearer ' + token
        },
        body: JSON.stringify({ 
          nome, 
          'cpf_cnpj' : cpf, 
          'telefone' : numeroContato, 
          endereco, 
          'nascimento' : aniversario, 
          'historico_compras' : historicoCompras 
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error (errorData.message || 'Erro ao registrar cliente.');
      }
      const data = await response.json();

      alert('Cliente  registrado com sucesso');
    }
    catch (err) {
      setError(err.message);
    }
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

        <div className='form-group'>
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
        {error && <p className='error-message'>{error}</p>}
      </form>
    </div>
  );
};

export default CadastroCliente;
