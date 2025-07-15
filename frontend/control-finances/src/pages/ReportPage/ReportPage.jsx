import React, { useState, useEffect } from "react";
import styles from "./ReportPage.module.css";

const reportsTypes = [
  { id: "cashflow", label: "Fluxo de Caixa" },
  { id: "expensesByCategory", label: "Despesas por Categoria" },
  { id: "budgetReport", label: "Relatório Orçamentário" },
];

function simpleBarChart(labels, data) {
  const max = Math.max(...data);
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "flex-end",
        height: "180px",
        marginTop: "16px",
      }}
    >
      {data.map((value, i) => {
        const heightPercent = (value / max) * 100;
        return (
          <div key={i} style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                height: `${heightPercent}%`,
                background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-24px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  fontWeight: "600",
                  fontSize: "0.8rem",
                  color: "#3b82f6",
                }}
              >
                {value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>
            <div style={{ marginTop: "8px", fontSize: "0.85rem" }}>
              {labels[i]}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function simplePieChart(labels, data) {
  const total = data.reduce((a, b) => a + b, 0);
  return (
    <ul style={{ listStyle: "none", paddingLeft: 0, marginTop: "16px" }}>
      {labels.map((label, i) => {
        const percent = (data[i] / total) * 100;
        return (
          <li
            key={i}
            style={{
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                backgroundColor: `hsl(${(i * 60) % 360}, 70%, 50%)`,
                borderRadius: "4px",
              }}
            />
            <span style={{ flexGrow: 1 }}>{label}</span>
            <b>{percent.toFixed(1)}%</b>
          </li>
        );
      })}
    </ul>
  );
}

export default function ReportPage() {
  const [reportType, setReportType] = useState("cashflow");
  const [period, setPeriod] = useState("2024");
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoading(true);

    fetch(`http://localhost:8000/api/report/${reportType}?period=${period}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar relatório");
        return res.json();
      })
      .then((data) => {
        setReportData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setReportData(null);
        setLoading(false);
      });
  }, [reportType, period]);

  const handleDownload = () => {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:8000/api/report-export/${reportType}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "text/csv",
    },
  })
    .then(res => res.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `relatorio-${reportType}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao exportar relatório.");
    });
};

  return (
    <section
      className={styles["report-container"]}
      aria-label="Página de relatórios financeiros"
    >
      <h1>Relatórios Financeiros</h1>

      <div className={styles.controls}>
        <label htmlFor="reportType">Tipo de Relatório:</label>
        <select
          id="reportType"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          {reportsTypes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.label}
            </option>
          ))}
        </select>

        <label htmlFor="period">Período:</label>
        <select
          id="period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="2024">Ano 2024</option>
          <option value="2023">Ano 2023</option>
          <option value="2022">Ano 2022</option>
        </select>

        <button onClick={handleDownload} aria-label="Exportar relatório">
          <span className="material-icons" aria-hidden="true">
            download
          </span>
        </button>
      </div>

      <div className={styles["report-body"]} aria-live="polite">
        <div className={styles["report-title"]}>
          {reportsTypes.find((r) => r.id === reportType)?.label}
        </div>

        {loading && <p>Carregando relatório...</p>}

        {!loading && reportData && (
          <>
            {reportType === "cashflow" && (
              <>
                <strong style={{ marginTop: "16px", display: "block" }}>
                  Receitas
                </strong>
                {simpleBarChart(reportData.labels, reportData.income)}

                <strong style={{ marginTop: "32px", display: "block" }}>
                  Despesas
                </strong>
                {simpleBarChart(reportData.labels, reportData.expense)}
              </>
            )}

            {reportType === "expensesByCategory" &&
              simplePieChart(reportData.labels, reportData.data)}
            {reportType === "budgetReport" && (
              <div style={{ marginTop: "16px" }}>
                <strong>Orçamento Mensal vs Gasto</strong>
                <table
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    borderCollapse: "collapse",
                  }}
                >
                  <thead>
                    <tr style={{ background: "#d1fae5" }}>
                      <th style={{ padding: "8px" }}>Mês</th>
                      <th style={{ padding: "8px" }}>Orçamento</th>
                      <th style={{ padding: "8px" }}>Gasto</th>
                      <th style={{ padding: "8px" }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.labels.map((month, i) => {
                      const budget = reportData.budget[i];
                      const spent = reportData.spent[i];
                      const status =
                        spent <= budget ? "Dentro" : "Ultrapassado";
                      const statusColor =
                        spent <= budget ? "#3b82f6" : "#ef4444";

                      return (
                        <tr key={month}>
                          <td style={{ padding: "8px" }}>{month}</td>
                          <td style={{ padding: "8px" }}>
                            {budget.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td style={{ padding: "8px" }}>
                            {spent.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </td>
                          <td
                            style={{
                              padding: "8px",
                              color: statusColor,
                              fontWeight: "700",
                            }}
                          >
                            {status}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {!loading && !reportData && (
          <p style={{ color: "red" }}>
            Não foi possível carregar os dados do relatório.
          </p>
        )}
      </div>
    </section>
  );
}
