import React, { useState, useEffect } from "react";
import styles from "./MetasFinanceiras.module.css";

const MetasFinanceiras = () => {
  const [meta, setMeta] = useState("");
  const [valor, setValor] = useState("");
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/goals", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setMetas(data))
      .catch((err) => console.error("Erro ao buscar metas:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8000/api/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: meta,
        value: valor,
      }),
    });

    if (response.ok) {
      const newGoal = await response.json();
      console.log("Meta criada com sucesso:", newGoal);
      setMetas((prev) => [...prev, newGoal]);
    } else {
      console.error("Erro ao criar meta:", response.statusText);
    }
  };

  return (
    <div className="container">
      <h1>Inserir Metas Financeiras</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="meta">Nome da Meta:</label>
          <input
            type="text"
            id="meta"
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="valor">Valor da Meta:</label>
          <input
            type="number"
            id="valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Adicionar Meta</button>
      </form>
      <h2>Minhas Metas</h2>
      <ul>
        {metas.length === 0 ? (
          <p>Nenhuma meta cadastrada ainda.</p>
        ) : (
          metas.map((m) => (
            <li key={m.id}>
              <strong>{m.name}</strong> - R$ {(Number(m.value) || 0).toFixed(2)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default MetasFinanceiras;
