import React, { useState } from 'react';

/**
 * Importar Google Fonts e Material Icons no index.html ou via Helmet:
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
 */

const reportsTypes = [
  { id: 'cashflow', label: 'Fluxo de Caixa' },
  { id: 'expensesByCategory', label: 'Despesas por Categoria' },
  { id: 'budgetReport', label: 'Relatório Orçamentário' },
];

const sampleReportData = {
  cashflow: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho'],
    data: [5000, 4500, 4700, 6000, 5500, 5800],
  },
  expensesByCategory: {
    labels: ['Alimentação', 'Transporte', 'Moradia', 'Lazer', 'Saúde'],
    data: [1500, 800, 1200, 400, 500],
  },
  budgetReport: {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril'],
    budget: [4000, 4000, 4000, 4000],
    spent: [3500, 4200, 3800, 3900],
  }
};

function simpleBarChart(labels, data) {
  // Returns JSX bars scaled to max data value
  const max = Math.max(...data);
  return (
    <div style={{display: 'flex', gap: '12px', alignItems: 'flex-end', height: '180px', marginTop: '16px'}}>
      {data.map((value, i) => {
        const heightPercent = (value / max) * 100;
        return (
          <div key={i} style={{flex: 1, textAlign: 'center'}}>
            <div style={{
              height: `${heightPercent}%`,
              background: 'linear-gradient(135deg, #3b82f6, #1e3a8a)',
              borderRadius: '8px',
              transition: 'height 0.3s ease',
              position: 'relative',
              cursor: 'default'
            }} title={`${labels[i]}: ${value.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}`}>
              <span style={{
                position: 'absolute',
                top: '-24px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontWeight: '600',
                fontSize: '0.8rem',
                color: '#3b82f6',
                userSelect: 'none',
              }}>{value.toLocaleString('pt-BR', {style: 'currency', currency:'BRL'})}</span>
            </div>
            <div style={{marginTop: '8px', fontSize: '0.85rem', userSelect: 'none'}}>{labels[i]}</div>
          </div>
        );
      })}
    </div>
  );
}

function simplePieChart(labels, data) {
  // Returns a pie chart approximation with percentage slices (legend)
  const total = data.reduce((a,b) => a+b, 0);
  return (
    <>
      <ul style={{listStyle: 'none', paddingLeft: 0, marginTop: '16px'}}>
        {labels.map((label, i) => {
          const percent = (data[i]/total)*100;
          return (
            <li key={i} style={{marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px', userSelect:'none'}}>
              <span style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                backgroundColor: `hsl(${(i*60) % 360}, 70%, 50%)`,
                borderRadius: '4px',
                flexShrink: 0,
              }} />
              <span style={{flexGrow: 1}}>{label}</span>
              <b>{percent.toFixed(1)}%</b>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function ReportPage() {
  const [reportType, setReportType] = useState('cashflow');
  const [period, setPeriod] = useState('2024');  // Placeholder for period selection

  // In real app, data fetched based on period and type
  const reportData = sampleReportData[reportType];

  const handleDownload = () => {
    alert(`Exportar relatório "${reportsTypes.find(r=>r.id===reportType).label}" (Função simulada)`);
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          margin: 0; 
          padding: 0; 
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          color: #111827;
          min-height: 100vh;
        }
        .report-container {
          max-width: 980px;
          margin: 24px auto;
          padding: 16px 24px 48px;
        }
        h1 {
          font-weight: 700;
          color: #3b82f6; /* Alterado para azul */
          font-size: 2rem;
          margin-bottom: 24px;
          user-select:none;
        }
        select, button {
          font-size: 1rem;
          padding: 10px 16px;
          border-radius: 16px;
          border: 1px solid #d1d5db;
          margin-right: 16px;
          cursor: pointer;
          font-weight: 600;
          min-width: 160px;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        select:focus, button:focus {
          outline: none;
          border-color: #3b82f6; /* Alterado para azul */
          box-shadow: 0 0 6px #3b82f6cc; /* Alterado para azul */
          background-color: #bfdbfe; /* Alterado para azul claro */
        }
        button {
          background: linear-gradient(135deg, #3b82f6, #1e3a8a); /* Alterado para azul */
          color: white;
          border: none;
          min-width: 140px;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background: linear-gradient(135deg, #1e3a8a, #3b82f6); /* Alterado para azul */
        }
        .controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 32px;
        }
        .report-title {
          font-weight: 600;
          font-size: 1.6rem;
          margin-bottom: 16px;
          user-select:none;
        }
        .report-body {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 6px 12px rgb(0 0 0 / 0.05);
          user-select:none;
        }
        .summary {
          margin-top: 24px;
          font-weight: 600;
          font-size: 1.1rem;
        }
        @media (max-width: 560px) {
          .controls {
            flex-direction: column;
            align-items: stretch;
          }
          select, button {
            margin-bottom: 12px;
            width: 100%;
            min-width: unset;
            margin-right: 0;
          }
        }
      `}</style>

      <section className="report-container" aria-label="Página de relatórios financeiros">
        <h1>Relatórios Financeiros</h1>

        <div className="controls">
          <label htmlFor="reportType" style={{ fontWeight: '600', marginRight: '8px', userSelect:'none' }}>Tipo de Relatório:</label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            aria-label="Selecionar tipo de relatório"
          >
            {reportsTypes.map(r => (
              <option key={r.id} value={r.id}>{r.label}</option>
            ))}
          </select>

          <label htmlFor="period" style={{ fontWeight: '600', marginRight: '8px', userSelect:'none' }}>Período:</label>
          <select
            id="period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            aria-label="Selecionar período"
          >
            <option value="2024">Ano 2024</option>
            <option value="2023">Ano 2023</option>
            <option value="2022">Ano 2022</option>
          </select>

          <button onClick={handleDownload} aria-label="Exportar relatório">
            <span className="material-icons" aria-hidden="true">download</span>
          </button>
        </div>

        <div className="report-body" aria-live="polite" aria-atomic="true">
          <div className="report-title">{reportsTypes.find(r=>r.id===reportType)?.label}</div>

          {reportType === 'cashflow' && simpleBarChart(reportData.labels, reportData.data)}
          {reportType === 'expensesByCategory' && simplePieChart(reportData.labels, reportData.data)}
          {reportType === 'budgetReport' && (
            <>
              <div style={{marginTop:'16px'}}>
                <strong>Orçamento Mensal vs Gasto</strong>
                <div style={{marginTop:'16px'}}>
                  <table style={{width:'100%', borderCollapse:'collapse'}}>
                    <thead>
                      <tr style={{background:'#d1fae5'}}>
                        <th style={{padding:'8px', borderBottom:'1px solid #ccc'}}>Mês</th>
                        <th style={{padding:'8px', borderBottom:'1px solid #ccc'}}>Orçamento</th>
                        <th style={{padding:'8px', borderBottom:'1px solid #ccc'}}>Gasto</th>
                        <th style={{padding:'8px', borderBottom:'1px solid #ccc'}}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.labels.map((month, i) => {
                        const budget = reportData.budget[i];
                        const spent = reportData.spent[i];
                        const status = spent <= budget ? 'Dentro' : 'Ultrapassado';
                        const statusColor = spent <= budget ? '#3b82f6' : '#ef4444';

                        return (
                          <tr key={month}>
                            <td style={{padding:'8px', borderBottom:'1px solid #eee'}}>{month}</td>
                            <td style={{padding:'8px', borderBottom:'1px solid #eee'}}>{budget.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                            <td style={{padding:'8px', borderBottom:'1px solid #eee'}}>{spent.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</td>
                            <td style={{padding:'8px', borderBottom:'1px solid #eee', color: statusColor, fontWeight: '700'}}>{status}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
