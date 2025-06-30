import React from 'react';
import styles from './Dashboard.module.css';
import finanTrackLogo from '../assets/logo.png';

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
    <div className={styles['dashboard-container']} role="main" aria-label="Dashboard financeiro principal">
      <header className={styles.header} role="banner" aria-label="Cabeçalho principal com saldo e ações">
        <div className={styles['header-left']} aria-live="polite" aria-atomic="true">
        <img 
          src={finanTrackLogo}  // Ensure the logo variable points to the imported logo
          alt="Logo do app" 
          className={styles['app-logo']} // Add a class for styling if necessary
          aria-hidden="true" 
          style={{ height: '40px' }} // Adjust the height as needed
        />
        <span>Total Líquido: </span>
        <span className={styles['header-balance']} tabIndex={0} aria-label={`Saldo total líquido ${totalNetWorth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}>
          {totalNetWorth.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
      </div>
        <div className={styles['header-actions']} aria-label="Ações rápidas e notificações">
          <button aria-label="Adicionar nova movimentação">
            <span className="material-icons" aria-hidden="true">Adicionar movimentação</span> {/* Replace with appropriate icon */}
          </button>
          <button aria-label="Ver notificações">
            <span className="material-icons" aria-hidden="true">Notificações</span>
          </button>
        </div>
      </header>


      <aside className={styles.sidebar} role="navigation" aria-label="Menu lateral principal">
        <nav>
          <button tabIndex={0}>Contas</button>
          <button tabIndex={0}>Categorias</button>
          <button tabIndex={0}>Metas Financeiras</button>
        </nav>
      </aside>

      <main className={styles.main} role="main" aria-label="Conteúdo principal dashboard">
        <section className={styles.card} aria-label="Resumo das contas">
          <h2>Contas</h2>
          <div className={styles['accounts-list']}>
            {accounts.map(acc => (
              <div key={acc.id} className={styles['account-card']} tabIndex={0} aria-label={`${acc.name} com saldo de ${acc.balance.toLocaleString('pt-BR', {style: 'currency', currency: acc.currency})}`}>
                <div className={styles['account-name']}>{acc.name}</div>
                <div className={styles['account-balance']}>
                  {acc.balance.toLocaleString('pt-BR', {style: 'currency', currency: acc.currency})}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.card} ${styles['transactions-list']}`} aria-label="Lista das últimas transações">
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
                  <td className={`${styles.amount} ${tx.amount < 0 ? styles.negative : styles.positive}`}>
                    {tx.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.card} aria-label="Resumo do orçamento">
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

      <aside className={styles.rightpanel} aria-label="Painel direito com contas a pagar e investimentos">
        <section className={styles['rightpanel-section']} aria-label="Próximas contas a pagar">
          <h3>Contas a Pagar</h3>
          {billsDue.length === 0 ? <p>Sem contas pendentes.</p> :
            billsDue.map(bill => (
              <div className={styles['bill-item']} key={bill.id}>
                <div className={styles.name}>{bill.name}</div>
                <div className={styles.duedate}>Vence em {new Date(bill.dueDate).toLocaleDateString('pt-BR')}</div>
                <div className={styles.amount}>{bill.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
              </div>
            ))
          }
        </section>

        <section className={styles['rightpanel-section']} aria-label="Resumo dos investimentos">
          <h3>Investimentos</h3>
          <div className={styles['investment-summary']} tabIndex={0} aria-label={`Valor total em investimentos ${investmentsSummary.totalValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}, ganho de ${investmentsSummary.gainLossPercent} por cento`}>
            <div className={styles['total-value']}>{investmentsSummary.totalValue.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</div>
            <div className={`${styles['gain-loss']} ${investmentsSummary.gainLossPercent >= 0 ? styles['gain-positive'] : styles['gain-negative']}`}>
              {investmentsSummary.gainLossPercent >= 0 ? '▲' : '▼'} {investmentsSummary.gainLossPercent}%
            </div>
          </div>
        </section>

        <section className={styles['rightpanel-section']} aria-label="Insights financeiros e recomendações">
          <h3>Insights</h3>
          <div className={styles['insight-item']} tabIndex={0}>
            Gasto Mensal: {insights.monthlySpending.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
          </div>
          <div className={styles['insight-item']} tabIndex={0}>
            Principais Categorias:
            <ul>
              {insights.topCategories.map(cat => (
                <li key={cat.category}>{cat.category}: {cat.amount.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</li>
              ))}
            </ul>
          </div>
          <div className={styles['insight-item']} tabIndex={0}>
            <strong>Recomendação:</strong> {insights.recommendations}
          </div>
        </section>
      </aside>
    </div>
  );
}