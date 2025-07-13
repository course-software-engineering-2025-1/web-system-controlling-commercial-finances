CREATE TABLE Perfis (
    id_perfil INT PRIMARY KEY,
    nome_perfil VARCHAR(50) NOT NULL UNIQUE, -- Ex: 'Comerciante', 'Funcionário'
    descricao TEXT
);

-- Tabela principal de usuários do sistema (RF001)
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    id_perfil INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) UNIQUE, 
    senha VARCHAR(255) NOT NULL, 
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    theme VARCHAR (50) DEFAULT 'light',
    notificationsEnabled BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_perfil) REFERENCES Perfis(id_perfil)
);

-- Tabela para cadastro de clientes (RF006)
CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    endereco TEXT,
    data_aniversario DATE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para cadastro de fornecedores (RF007)
CREATE TABLE Fornecedores (
    id_fornecedor INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    contato VARCHAR(100),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabela para cadastro de produtos (RF005)
CREATE TABLE Produtos (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    id_comerciante INT NOT NULL,
    nome_produto VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE,
    preco DECIMAL(10, 2) NOT NULL,
    estoque INT DEFAULT 0,
    categoria VARCHAR(100),
    FOREIGN KEY (id_comerciante) REFERENCES Usuarios(id_usuario)
);

-- Tabela para registrar múltiplas contas (caixa, contas bancárias) (RF015)
CREATE TABLE Contas_Bancarias (
    id_conta INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL, 
    name VARCHAR(100) NOT NULL, 
    tipo_conta VARCHAR(50),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabela central para todas as transações financeiras (RF009, RF010, RF011)
CREATE TABLE Transacoes (
    id_transacao INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    id_conta INT NOT NULL,
    categoria VARCHAR(100),
    amount DECIMAL(15, 2) NOT NULL,
    subcategoria VARCHAR(100),
    descricao TEXT,
    data TIMESTAMP NOT NULL,
    localizacao VARCHAR(255),
    is_recurring BOOLEAN DEFAULT FALSE,
    tipo ENUM('Receita', 'Despesa') NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_conta) REFERENCES Contas_Bancarias(id_conta)
);

-- Tabela para contas a pagar/receber
CREATE TABLE Contas (
    id_conta_pr INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    due_date DATE NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabela específica para vendas (RF009)
CREATE TABLE Vendas (
    id_venda INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    id_movimentacao INT NOT NULL, 
    id_usuario_vendedor INT NOT NULL,
    valor_total DECIMAL(15, 2) NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_movimentacao) REFERENCES Transacoes(id_transacao),
    FOREIGN KEY (id_usuario_vendedor) REFERENCES Usuarios(id_usuario)
);

-- Tabela de itens da venda (tabela de junção para Vendas e Produtos)
CREATE TABLE Vendas_Itens (
    id_venda_item INT PRIMARY KEY AUTO_INCREMENT,
    id_venda INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10, 2) NOT NULL, 
    custo_unitario DECIMAL(10, 2), 
    FOREIGN KEY (id_venda) REFERENCES Vendas(id_venda),
    FOREIGN KEY (id_produto) REFERENCES Produtos(id_produto)
);

-- Tabela para contas a pagar e a receber (RF016)
CREATE TABLE Contas_Pagar_Receber (
    id_conta_pr INT PRIMARY KEY AUTO_INCREMENT,
    id_movimentacao INT,
    id_usuario INT NOT NULL,
    id_fornecedor INT, 
    id_cliente INT, 
    descricao TEXT NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    data_vencimento DATE NOT NULL,
    data_pagamento DATE,
    status VARCHAR(15) NOT NULL DEFAULT 'Pendente',
    tipo VARCHAR(15) NOT NULL,
    FOREIGN KEY (id_movimentacao) REFERENCES Transacoes(id_transacao),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_fornecedor) REFERENCES Fornecedores(id_fornecedor),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

-- Tabela para orçamentos (Budgets)
CREATE TABLE Budgets (
    id_budget INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    spent DECIMAL(15, 2) DEFAULT 0.00,
    data DATE NOT NULL, -- Mês/Ano do orçamento
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabela para metas financeiras (Goals)
CREATE TABLE Metas (
    id_meta INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    valor_objetivo DECIMAL(15, 2) NOT NULL,
    data_alvo DATE,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabela para investimentos
CREATE TABLE Investimentos (
    id_investimento INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    valor_inicial DECIMAL(15, 2) NOT NULL,
    valor_atual DECIMAL(15, 2) NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);

-- Tabela para notificações
CREATE TABLE Notificacoes (
    id_notificacao INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    mensagem TEXT NOT NULL,
    prioridade ENUM('Baixa', 'Média', 'Alta') DEFAULT 'Média',
    lida BOOLEAN DEFAULT FALSE,
    data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);
