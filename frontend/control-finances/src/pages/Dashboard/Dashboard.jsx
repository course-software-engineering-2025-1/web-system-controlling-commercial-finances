import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import finanTrackLogo from "../assets/logo.png";
import bellLogo from "../assets/bell.png";
import addLogo from "../assets/add.png";

export default function Dashboard() {
  const navigate = useNavigate();

  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [billsDue, setBillsDue] = useState([]);
  const [investmentsSummary, setInvestmentsSummary] = useState({
    totalValue: 0,
    gainLossPercent: 0,
  });

  const [insights, setInsights] = useState({
    monthlySpending: 0,
    topCategories: [],
    recommendations: "",
  });

  const totalNetWorth = accounts.reduce(
    (sum, acc) => sum + (Number(acc.balance) || 0),
    0
  );
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    fetch("http://localhost:8000/api/accounts", { method: "GET", headers })
      .then((res) => res.json())
      .then(setAccounts)
      .catch((err) => console.error("Erro ao buscar contas:", err));

    fetch("http://localhost:8000/api/transactions", { method: "GET", headers })
      .then((res) => res.json())
      .then(setTransactions)
      .catch((err) => console.error("Erro ao buscar transações:", err));

    fetch("http://localhost:8000/api/budgets", { method: "GET", headers })
      .then((res) => res.json())
      .then(setBudgets)
      .catch((err) => console.error("Erro ao buscar orçamentos:", err));

    fetch("http://localhost:8000/api/bills-due", { method: "GET", headers })
      .then((res) => res.json())
      .then(setBillsDue)
      .catch((err) => console.error("Erro ao buscar contas a pagar:", err));

    fetch("http://localhost:8000/api/investments-summary", {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((data) => {
        setInvestmentsSummary({
          totalValue: data.total_current_value,
          gainLossPercent: data.gain_loss_percent,
        });
      })
      .catch((err) => console.error("Erro ao buscar investimentos:", err));

    fetch("http://localhost:8000/api/insights", { method: "GET", headers })
      .then((res) => res.json())
      .then((data) => {
        setInsights({
          monthlySpending: data.monthly_spending,
          topCategories: data.top_categories,
          recommendations: data.recommendations,
        });
      })
      .catch((err) => console.error("Erro ao buscar insights:", err));
  }, []);

  return (
    <div
      className={styles["dashboard-container"]}
      role="main"
      aria-label="Dashboard financeiro principal"
    >
      <header
        className={styles.header}
        role="banner"
        aria-label="Cabeçalho principal com saldo e ações"
      >
        <div
          className={styles["header-left"]}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Botão do menu mobile */}
          <button
            className={styles.mobileMenuButton}
            aria-label="Abrir menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          <img
            src={finanTrackLogo} // Ensure the logo variable points to the imported logo
            alt="Logo do app"
            className={styles["app-logo"]} // Add a class for styling if necessary
            aria-hidden="true"
            style={{ height: "40px" }} // Adjust the height as needed
          />
          <span>Total Líquido: </span>
          <span
            className={styles["header-balance"]}
            tabIndex={0}
            aria-label={`Saldo total líquido ${totalNetWorth.toLocaleString(
              "pt-BR",
              { style: "currency", currency: "BRL" }
            )}`}
          >
            {totalNetWorth.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <div
          className={styles["header-actions"]}
          aria-label="Ações rápidas e notificações"
        >
          <button
            aria-label="Adicionar nova movimentação"
            onClick={() => navigate("/transacoes")}
          >
            <img src={addLogo} alt="Nova Movimentação" style={{ height: 24 }} />
          </button>
          <button
            aria-label="Ver notificações"
            onClick={() => navigate("/notificacoes")}
          >
            <img src={bellLogo} alt="Notificações" style={{ height: 24 }} />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Menu mobile">
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/cadastro-cliente");
            }}
          >
            Clientes
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/cadastro-fornecedor");
            }}
          >
            Fornecedores
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/metas-financeiras");
            }}
          >
            Metas Financeiras
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/usuarios");
            }}
          >
            Usuários
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/produtos");
            }}
          >
            Produtos
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/relatorios");
            }}
          >
            Relatórios
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/transacoes");
            }}
          >
            <img
              src={addLogo}
              alt="Nova Movimentação"
              style={{ height: 20, marginRight: 8 }}
            />{" "}
            Nova Movimentação
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/notificacoes");
            }}
          >
            <img
              src={bellLogo}
              alt="Notificações"
              style={{ height: 20, marginRight: 8 }}
            />{" "}
            Notificações
          </button>
          <button
            onClick={() => {
              setMenuOpen(false);
              navigate("/perfilsettings");
            }}
          >
            Perfil & Configurações
          </button>
        </nav>
      )}

      <aside
        className={styles.sidebar}
        role="navigation"
        aria-label="Menu lateral principal"
      >
        <nav>
          <button tabIndex={0} onClick={() => navigate("/cadastro-cliente")}>
            Clientes
          </button>
          <button tabIndex={0} onClick={() => navigate("/cadastro-fornecedor")}>
            Fornecedores
          </button>
          <button tabIndex={0} onClick={() => navigate("/metas-financeiras")}>
            Metas Financeiras
          </button>
          <button tabIndex={0} onClick={() => navigate("/usuarios")}>
            Usuários
          </button>
          <button tabIndex={0} onClick={() => navigate("/produtos")}>
            Produtos
          </button>
          <button tabIndex={0} onClick={() => navigate("/relatorios")}>
            Relatórios
          </button>
          <button tabIndex={0} onClick={() => navigate("/perfilsettings")}>
            Perfil & Configurações
          </button>
        </nav>
      </aside>

      <main
        className={styles.main}
        role="main"
        aria-label="Conteúdo principal dashboard"
      >
        <section className={styles.card} aria-label="Resumo das contas">
          <h2>Contas</h2>
          <div className={styles["accounts-list"]}>
            {accounts.map((acc) => (
              <div
                key={acc.id}
                className={styles["account-card"]}
                tabIndex={0}
                aria-label={`${
                  acc.name
                } com saldo de ${acc.balance.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: acc.currency,
                })}`}
              >
                <div className={styles["account-name"]}>{acc.name}</div>
                <div className={styles["account-balance"]}>
                  {acc.balance.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: acc.currency,
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className={`${styles.card} ${styles["transactions-list"]}`}
          aria-label="Lista das últimas transações"
        >
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
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{tx.description}</td>
                  <td>{new Date(tx.date).toLocaleDateString("pt-BR")}</td>
                  <td>{tx.category}</td>
                  <td
                    className={`${styles.amount} ${
                      tx.amount < 0 ? styles.negative : styles.positive
                    }`}
                  >
                    {tx.amount.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.card} aria-label="Resumo do orçamento">
          <h2>Orçamento Atual</h2>
          {budgets.map((bud) => {
            const percentSpent = Math.min(100, (bud.spent / bud.amount) * 100);
            return (
              <div key={bud.id} style={{ marginBottom: "16px" }}>
                <strong>{bud.name}</strong>
                <div
                  style={{
                    background: "#bfdbfe",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginTop: "8px",
                  }}
                >
                  <div
                    style={{
                      width: `${percentSpent}%`,
                      background: "#3b82f6",
                      height: "14px",
                      borderRadius: "12px",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
                <small>
                  {bud.spent.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                  de{" "}
                  {bud.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}{" "}
                  gasto
                </small>
              </div>
            );
          })}
        </section>
      </main>

      <aside
        className={styles.rightpanel}
        aria-label="Painel direito com contas a pagar e investimentos"
      >
        <section
          className={styles["rightpanel-section"]}
          aria-label="Próximas contas a pagar"
        >
          <h3>Contas a Pagar</h3>
          {billsDue.length === 0 ? (
            <p>Sem contas pendentes.</p>
          ) : (
            billsDue.map((bill) => (
              <div className={styles["bill-item"]} key={bill.id}>
                <div className={styles.name}>{bill.name}</div>
                <div className={styles.duedate}>
                  Vence em {new Date(bill.dueDate).toLocaleDateString("pt-BR")}
                </div>
                <div className={styles.amount}>
                  {bill.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </div>
              </div>
            ))
          )}
        </section>

        <section
          className={styles["rightpanel-section"]}
          aria-label="Resumo dos investimentos"
        >
          <h3>Investimentos</h3>
          <div
            className={styles["investment-summary"]}
            tabIndex={0}
            aria-label={`Valor total em investimentos ${investmentsSummary.totalValue.toLocaleString(
              "pt-BR",
              { style: "currency", currency: "BRL" }
            )}, ganho de ${investmentsSummary.gainLossPercent} por cento`}
          >
            <div className={styles["total-value"]}>
              {investmentsSummary.totalValue.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <div
              className={`${styles["gain-loss"]} ${
                investmentsSummary.gainLossPercent >= 0
                  ? styles["gain-positive"]
                  : styles["gain-negative"]
              }`}
            >
              {investmentsSummary.gainLossPercent >= 0 ? "▲" : "▼"}{" "}
              {investmentsSummary.gainLossPercent}%
            </div>
          </div>
        </section>

        <section
          className={styles["rightpanel-section"]}
          aria-label="Insights financeiros e recomendações"
        >
          <h3>Insights</h3>
          <div className={styles["insight-item"]} tabIndex={0}>
            Gasto Mensal:{" "}
            {insights.monthlySpending.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <div className={styles["insight-item"]} tabIndex={0}>
            Principais Categorias:
            <ul>
              {insights.topCategories.map((cat) => (
                <li key={cat.category}>
                  {cat.category}:{" "}
                  {cat.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles["insight-item"]} tabIndex={0}>
            <strong>Recomendação:</strong> {insights.recommendations}
          </div>
        </section>
      </aside>
    </div>
  );
}
