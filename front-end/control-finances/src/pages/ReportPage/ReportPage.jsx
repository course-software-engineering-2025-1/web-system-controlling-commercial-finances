import React, { useState } from 'react';
import styles from './ReportPage.module.css';

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
  const total = data.reduce((a,b) => a+b, 0);
  return (
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
  );
}

export default function ReportPage() {
  const [reportType, setReportType] = useState('cashflow');
  const [period, setPeriod] = useState('2024');

  const reportData = sampleReportData[reportType];

  const handleDownload = () => {
    alert(`Exportar relatório "${reportsTypes.find(r=>r.id===reportType).label}" (Função simulada)`);
  };

  return (
    <section className={styles['report-container']} aria-label="Página de relatórios financeiros">
      <h1>Relatórios Financeiros</h1>

      <div className={styles.controls}>
        <label htmlFor="reportType">Tipo de Relatório:</label>
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

        <label htmlFor="period">Período:</label>
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

      <div className={styles['report-body']} aria-live="polite" aria-atomic="true">
        <div className={styles['report-title']}>{reportsTypes.find(r=>r.id===reportType)?.label}</div>

        {reportType === 'cashflow' && simpleBarChart(reportData.labels, reportData.data)}
        {reportType === 'expensesByCategory' && simplePieChart(reportData.labels, reportData.data)}
        {reportType === 'budgetReport' && (
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
        )}
      </div>
    </section>
  );
}