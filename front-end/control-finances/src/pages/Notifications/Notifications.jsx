import React, { useState, useEffect } from "react";
import styles from "./Notifications.module.css";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:8000/api/notifications/check", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).catch((err) =>
      console.error("Erro ao verificar notificações automáticas:", err)
    );

    fetch("http://localhost:8000/api/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error("Erro ao buscar notificações:", err));
  }, []);

  const markAllAsRead = () => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:8000/api/notifications/mark-all", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro no backend");
        return res.json();
      })
      .then(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      })

      .catch((err) =>
        console.error("Erro ao marcar todas as notificações como lidas:", err)
      );
  };

  const toggleRead = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8000/api/notifications/${id}/toggle-read`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((updated) => {
        setNotifications((prev) =>
          prev.map((n) => (n.id === updated.id ? updated : n))
        );
      })

      .catch((err) =>
        console.error("Erro ao alternar status de leitura:", err)
      );
  };

  const priorityColor = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#3b82f6",
  };

  return (
    <section
      className={styles["notifications-container"]}
      aria-label="Notificações do sistema"
    >
      <h1>Notificações</h1>
      <button
        className={styles["mark-all"]}
        onClick={markAllAsRead}
        aria-label="Marcar todas as notificações como lidas"
      >
        Marcar todas como lidas
      </button>

      <ul
        className={styles["notifications-list"]}
        role="list"
        aria-live="polite"
        aria-relevant="additions"
      >
        {notifications.length === 0 ? (
          <li
            className={styles["notification-item"]}
            style={{ justifyContent: "center" }}
          >
            Sem notificações recentes.
          </li>
        ) : (
          notifications.map((notification) => (
            <li
              key={notification.id}
              className={`${styles["notification-item"]} ${
                !notification.read ? styles.unread : ""
              }`}
              aria-label={`${notification.message}, prioridade ${
                notification.priority
              }, ${notification.read ? "lida" : "não lida"}`}
              tabIndex={0}
            >
              <span
                className={styles["priority-indicator"]}
                style={{
                  backgroundColor: priorityColor[notification.priority],
                }}
                aria-hidden="true"
              />
              <div className={styles["notification-content"]}>
                <div className={styles["notification-message"]}>
                  {notification.message}
                </div>
                <div className={styles["notification-date"]}>
                  {new Date(notification.date).toLocaleDateString("pt-BR")}
                </div>
              </div>
              <button
                aria-label={
                  notification.read
                    ? "Marcar como não lida"
                    : "Marcar como lida"
                }
                className={`${styles["toggle-read"]} ${
                  notification.read ? styles.read : ""
                }`}
                onClick={() => toggleRead(notification.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") toggleRead(notification.id);
                }}
                title={
                  notification.read
                    ? "Marcar como não lida"
                    : "Marcar como lida"
                }
              >
                {notification.read
                  ? "marcar como não lido"
                  : "marcar como lido"}
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
