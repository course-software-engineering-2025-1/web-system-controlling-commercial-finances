CREATE TABLE Perfis (
    id_perfil INT PRIMARY KEY,
    nome_perfil VARCHAR(50) NOT NULL UNIQUE, -- Ex: 'Comerciante', 'Funcionário'
    descricao TEXT
);

-- Tabela principal de usuários do sistema (RF001)
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY,
    id_perfil INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    cpf VARCHAR(14) NOT NULL UNIQUE, 
    senha VARCHAR(255) NOT NULL, 
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_perfil) REFERENCES Perfis(id_perfil)
);

-- Tabela para cadastro de clientes (RF006)
CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(18) UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(255),
    endereco TEXT,
    data_aniversario DATE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para cadastro de fornecedores (RF007)
CREATE TABLE Fornecedores (
    id_fornecedor INT PRIMARY KEY,
    nome_fantasia VARCHAR(255) NOT NULL,
    razao_social VARCHAR(255),
    cnpj VARCHAR(18) UNIQUE,
    contato_principal VARCHAR(100),
    telefone VARCHAR(20),
    email VARCHAR(255),
    dados_bancarios TEXT,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para categorizar produtos
CREATE TABLE Categorias_Produtos (
    id_categoria_produto INT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL UNIQUE
);

-- Tabela para cadastro de produtos (RF005)
CREATE TABLE Produtos (
    id_produto INT PRIMARY KEY,
    id_categoria_produto INT,
    nome_produto VARCHAR(255) NOT NULL,
    descricao TEXT,
    preco_venda DECIMAL(10, 2) NOT NULL,
    preco_custo DECIMAL(10, 2),
    estoque INT DEFAULT 0,
    unidade_medida VARCHAR(20) DEFAULT 'un', -- Ex: 'un', 'kg', 'L'
    data_validade_lote DATE,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_categoria_produto) REFERENCES Categorias_Produtos(id_categoria_produto)
);

-- Tabela para registrar múltiplas contas (caixa, contas bancárias) (RF015)
CREATE TABLE Contas_Bancarias (
    id_conta INT PRIMARY KEY,
    id_usuario_proprietario INT NOT NULL, 
    nome_conta VARCHAR(100) NOT NULL, 
    tipo_conta VARCHAR(50),
    saldo_inicial DECIMAL(15, 2) DEFAULT 0.00,
    saldo_atual DECIMAL(15, 2) DEFAULT 0.00,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario_proprietario) REFERENCES Usuarios(id_usuario)
);

-- Tabela para categorias de receitas e despesas (RF008)
CREATE TABLE Categorias_Financeiras (
    id_categoria_financeira INT PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL,
    tipo VARCHAR(15) NOT NULL, 
    descricao TEXT
);

-- Tabela central para todas as transações financeiras (RF009, RF010, RF011)
CREATE TABLE Movimentacoes (
    id_movimentacao INT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_conta INT NOT NULL,
    id_categoria_financeira INT,
    descricao TEXT NOT NULL,
    valor DECIMAL(15, 2) NOT NULL,
    tipo_movimentacao VARCHAR(20) NOT NULL,
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    forma_pagamento VARCHAR(50), -- 'Dinheiro', 'Cartão de Crédito', 'PIX', etc.
    observacoes TEXT,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_conta) REFERENCES Contas_Bancarias(id_conta),
    FOREIGN KEY (id_categoria_financeira) REFERENCES Categorias_Financeiras(id_categoria_financeira)
);

-- Tabela específica para vendas (RF009)
CREATE TABLE Vendas (
    id_venda INT PRIMARY KEY,
    id_cliente INT,
    id_movimentacao INT NOT NULL, 
    id_usuario_vendedor INT NOT NULL,
    valor_total DECIMAL(15, 2) NOT NULL,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente),
    FOREIGN KEY (id_movimentacao) REFERENCES Movimentacoes(id_movimentacao),
    FOREIGN KEY (id_usuario_vendedor) REFERENCES Usuarios(id_usuario)
);

-- Tabela de itens da venda (tabela de junção para Vendas e Produtos)
CREATE TABLE Vendas_Itens (
    id_venda_item INT PRIMARY KEY,
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
    id_conta_pr INT PRIMARY KEY,
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
    FOREIGN KEY (id_movimentacao) REFERENCES Movimentacoes(id_movimentacao),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY (id_fornecedor) REFERENCES Fornecedores(id_fornecedor),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);
