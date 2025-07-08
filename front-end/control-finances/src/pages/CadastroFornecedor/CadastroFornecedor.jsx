import React, { useState } from 'react';
import styles from'./CadastroFornecedor.module.css';

const CadastrarFornecedor = () => {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [numeroContato, setNumeroContato] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Função para lidar com a submissão dos dados
        console.log({ nome, cnpj, numeroContato });
        // Aqui você pode adicionar lógica para enviar os dados para uma API ou similar
    };

    return (
        <div className="cadastrar-fornecedor">
            <h2>Cadastrar Fornecedor</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nome">Nome do Fornecedor:</label>
                    <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cnpj">CNPJ:</label>
                    <input
                        type="text"
                        id="cnpj"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numeroContato">Número de Contato:</label>
                    <input
                        type="text"
                        id="numeroContato"
                        value={numeroContato}
                        onChange={(e) => setNumeroContato(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastrarFornecedor;
