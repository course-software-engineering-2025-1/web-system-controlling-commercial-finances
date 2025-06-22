import React from 'react';

/**
 * Importar Google Fonts e Material Icons no index.html ou via Helmet:
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
 */

const accounts = [
  { id: 1, name: 'Conta Corrente', balance: 12000.32, currency: 'BRL' },
  { id: 2, name: 'Poupança', balance: 35000.00, currency: 'BRL' },
  { id: 3, name: 'Cartão de Crédito', balance: -2000.55, currency: 'BRL' },
];

const transactions = [
  { id: 1, description: 'Compra Mercado', amount: -250.00, date: '2024-06-20', category: 'Despesa' },
  { id: 2, description: 'Venda Produto', amount: 1200.00, date: '2024-06-21', category: 'Receita' },
  { id: 3, description: 'Conta Luz', amount: -180.00, date: '2024-06-21', category: 'Despesa' },
];

const budgets = [
  { id: 1, name: 'Orçamento Mensal', amount: 4000, spent: 3200 },
];

const billsDue = [
  { id: 1, name: 'Internet', dueDate: '2024-06-25', amount: 150.00, isPaid: false },
  { id: 2, name: 'Aluguel', dueDate: '2024-07-01', amount: 1200.00, isPaid: false },
];

const investmentsSummary = {
  totalValue: 15000,
  gainLossPercent: 5.3,
};

const insights = {
  monthlySpending: 3200,
  topCategories: [
    { category: 'Alimentação', amount: 1200 },
    { category: 'Transporte', amount: 800 },
  ],
  recommendations: 'Reduza gastos em Alimentação em 10% para melhorar saldo.',
};

export default function Dashboard() {
  const totalNetWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0);

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
        .dashboard-container {
          display: grid;
          grid-template-columns: 280px 1fr 320px;
          grid-template-rows: 60px 1fr;
          grid-template-areas:
            "header header header"
            "sidebar main rightpanel";
          height: 100vh;
          overflow: hidden;
          background: #f8fafc;
        }
        header.header {
          grid-area: header;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #3b82f6, #1e3a8a);
          padding: 0 24px;
          color: white;
          font-weight: 600;
          font-size: 1.3rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          z-index: 10;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .header-balance {
          font-size: 1.5rem;
          font-weight: 700;
          user-select:none;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .header-actions button {
          background: transparent;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 20px;
          transition: transform 0.25s ease;
        }
        .header-actions button:hover {
          transform: scale(1.1);
        }

        aside.sidebar {
          grid-area: sidebar;
          background: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          padding: 24px;
          overflow-y: auto;
        }
        aside.sidebar nav {
          display: flex;
          flex-direction: column;
          gap: 16px;
          font-weight: 600;
        }
        aside.sidebar nav button {
          background: #bfdbfe;
          border: none;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 1rem;
          text-align: left;
          cursor: pointer;
          transition: background-color 0.3s ease;
          color: #1e3a8a;
        }
        aside.sidebar nav button:hover,
        aside.sidebar nav button:focus {
          background: #3b82f6;
          color: white;
          outline: none;
        }

        main.main {
          grid-area: main;
          padding: 24px 32px;
          overflow-y: auto;
        }
        main.main h2 {
          margin-top: 0;
          font-weight: 700;
        }
        .card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 6px 12px rgb(0 0 0 / 0.05);
          padding: 24px;
          margin-bottom: 32px;
        }
        .card h3 {
          margin-top: 0;
          margin-bottom: 16px;
          font-weight: 600;
          color: #3b82f6;
        }

        .accounts-list {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        .account-card {
          background: #bfdbfe;
          border-radius: 12px;
          padding: 20px;
          min-width: 160px;
          flex: 1 1 160px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 4px 12px rgb(59 130 246 / 0.3);
          cursor:pointer;
          transition: background-color 0.3s ease;
          color: #1e3a8a;
        }
        .account-card:hover {
          background: #3b82f6;
          color: white;
        }
        .account-name {
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 8px;
          user-select:none;
        }
        .account-balance {
          font-weight: 600;
          font-size: 1.3rem;
          user-select:none;
        }

        .transactions-list table {
          width: 100%;
          border-collapse: collapse;
        }
        .transactions-list th, .transactions-list td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        .transactions-list th {
          background: #f3f4f6;
          font-weight: 600;
          user-select:none;
        }
        .transactions-list td.amount {
          font-weight: 700;
        }
        .transactions-list td.amount.negative {
          color: #ef4444;
        }
        .transactions-list td.amount.positive {
          color: #3b82f6;
        }

        aside.rightpanel {
          grid-area: rightpanel;
          background: white;
          border-left: 1px solid #e5e7eb;
          padding: 24px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .rightpanel-section h3 {
          margin-top: 0;
          font-weight: 600;
          color: #3b82f6;
        }
        .bill-item, .insight-item {
          background: #ecfdf5;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 12px;
          user-select:none;
        }
        .bill-item .name {
          font-weight: 600;
        }
        .bill-item .duedate {
          color: #6b7280;
          font-size: 0.9rem;
        }
        .investment-summary {
          background: #bfdbfe;
          border-radius: 20px;
          padding: 24px;
          text-align: center;
          user-select:none;
        }
        .investment-summary .total-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .investment-summary .gain-loss {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .gain-positive {
          color: #3b82f6;
        }
        .gain-negative {
          color: #ef4444;
        }

        /* Responsividade */
        @media (max-width: 1024px) {
          .dashboard-container {
            grid-template-columns: 70px 1fr;
            grid-template-rows: 60px 1fr;
            grid-template-areas:
             "header header"
             "sidebar main";
          }
          aside.rightpanel {
            display: none;
          }
          aside.sidebar {
            padding: 16px 8px;
            gap: 12px;
          }
          aside.sidebar nav button {
            font-size: 0.8rem;
            padding: 10px 8px;
          }
        }
        @media (max-width: 640px) {
          .dashboard-container {
            grid-template-columns: 1fr;
            grid-template-rows: 60px 1fr;
            grid-template-areas:
              "header"
              "main";
          }
          aside.sidebar {
            display: none;
          }
          main.main {
            padding: 16px 20px;
          }
          .accounts-list {
            flex-direction: column;
          }
          .account-card {
            min-width: auto;
          }
        }
      `}</style>

      <div className="dashboard-container" role="main" aria-label="Dashboard financeiro principal">
        <header className="header" role="banner" aria-label="Cabeçalho principal com saldo e ações">
          <div className="header-left" aria-live="polite" aria-atomic="true">
            <span>Total Líquido: </span>
            <span className="header-balance" tabIndex={0} aria-label={`Saldo total líquido ${totalNetWorth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}>
              {totalNetWorth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className="header-actions" aria-label="Ações rápidas e notificações">
            <button aria-label="Adicionar nova movimentação">
              <span className="material-icons" aria-hidden="true">logo do app</span>
            </button>
            <button aria-label="Ver notificações">
              <span className="material-icons" aria-hidden="true">notifications</span>
            </button>
          </div>
        </header>

        <aside className="sidebar" role="navigation" aria-label="Menu lateral principal">
          <nav>
            <button tabIndex={0}>Contas</button>
            <button tabIndex={0}>Categorias</button>
            <button tabIndex={0}>Metas Financeiras</button>
          </nav>
        </aside>

        <main className="main" role="main" aria-label="Conteúdo principal dashboard">
          <section className="card" aria-label="Resumo das contas">
            <h2>Contas</h2>
            <div className="accounts-list">
              {accounts.map(acc => (
                <div key={acc.id} className="account-card" tabIndex={0} aria-label={`${acc.name} com saldo de ${acc.balance.toLocaleString('pt-BR', {style: 'currency', currency: acc.currency})}`}>
                  <div className="account-name">{acc.name}</div>
                  <div className="account-balance">
                    {acc.balance.toLocaleString('pt-BR', {style: 'currency', currency: acc.currency})}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card transactions-list" aria-label="Lista das últimas transações">
            <h2>Últimas Transações</h2>
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Data</th>
                  <th>Categoria</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(tx => (
                  <tr key={tx.id}>
                    <td>{tx.description}</td>
                    <td>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                    <td>{tx.category}</td>
                    <td className={`amount ${tx.amount < 0 ? 'negative' : 'positive'}`}>
                      {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card" aria-label="Resumo do orçamento">
            <h2>Orçamento Atual</h2>
            {budgets.map(bud => {
              const percentSpent = Math.min(100, (bud.spent / bud.amount) * 100);
              return (
                <div key={bud.id} style={{marginBottom: '16px'}}>
                  <strong>{bud.name}</strong>
                  <div style={{background: '#bfdbfe', borderRadius: '12px', overflow: 'hidden', marginTop: '8px'}}>
                    <div style={{
                      width: `${percentSpent}%`,
                      background: '#3b82f6',
                      height: '14px',
                      borderRadius: '12px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <small>{bud.spent.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} de {bud.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})} gasto</small>
                </div>
              );
            })}
          </section>
        </main>

        <aside className="rightpanel" aria-label="Painel direito com contas a pagar e investimentos">
          <section className="rightpanel-section" aria-label="Próximas contas a pagar">
            <h3>Contas a Pagar</h3>
            {billsDue.length === 0 ? <p>Sem contas pendentes.</p> :
              billsDue.map(bill => (
                <div className="bill-item" key={bill.id}>
                  <div className="name">{bill.name}</div>
                  <div className="duedate">Vence em {new Date(bill.dueDate).toLocaleDateString('pt-BR')}</div>
                  <div className="amount">{bill.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
                </div>
              ))
            }
          </section>

          <section className="rightpanel-section" aria-label="Resumo dos investimentos">
            <h3>Investimentos</h3>
            <div className="investment-summary" tabIndex={0} aria-label={`Valor total em investimentos ${investmentsSummary.totalValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}, ganho de ${investmentsSummary.gainLossPercent} por cento`}>
              <div className="total-value">{investmentsSummary.totalValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
              <div className={`gain-loss ${investmentsSummary.gainLossPercent >= 0 ? 'gain-positive' : 'gain-negative'}`}>
                {investmentsSummary.gainLossPercent >= 0 ? '▲' : '▼'} {investmentsSummary.gainLossPercent}%
              </div>
            </div>
          </section>

          <section className="rightpanel-section" aria-label="Insights financeiros e recomendações">
            <h3>Insights</h3>
            <div className="insight-item" tabIndex={0}>
              Gasto Mensal: {insights.monthlySpending.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
            </div>
            <div className="insight-item" tabIndex={0}>
              Principais Categorias:
              <ul>
                {insights.topCategories.map(cat => (
                  <li key={cat.category}>{cat.category}: {cat.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</li>
                ))}
              </ul>
            </div>
            <div className="insight-item" tabIndex={0}>
              <strong>Recomendação:</strong> {insights.recommendations}
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}