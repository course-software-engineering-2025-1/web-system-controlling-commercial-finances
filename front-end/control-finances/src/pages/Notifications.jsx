import React, { useState } from 'react';

/**
 * Importar Google Fonts e Material Icons no index.html ou via Helmet:
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
 * <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
 */

const initialNotifications = [
  { id: 1, message: 'Conta de luz vence em 3 dias', date: '2024-06-22', priority: 'high', read: false },
  { id: 2, message: 'Meta financeira "Equipamentos" atingiu 75%', date: '2024-06-20', priority: 'medium', read: false },
  { id: 3, message: 'Relatório financeiro mensal disponível', date: '2024-06-18', priority: 'low', read: true },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications((prev) =>
      prev.map(n =>
        n.id === id ? { ...n, read: !n.read } : n
      )
    );
  };

  const priorityColor = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#3b82f6', // Alterado para azul
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
          height: 100%;
          font-family: 'Inter', sans-serif;
          background: #f8fafc;
          color: #111827;
        }
        .notifications-container {
          max-width: 600px;
          margin: 24px auto;
          padding: 0 16px 48px;
        }
        h1 {
          color: #3b82f6; /* Alterado para azul */
          font-weight: 700;
          font-size: 2rem;
          margin-bottom: 24px;
          user-select:none;
        }
        button.mark-all {
          background: #3b82f6; /* Alterado para azul */
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 16px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 24px;
          transition: background-color 0.3s ease;
          font-size: 1rem;
        }
        button.mark-all:hover, button.mark-all:focus {
          background: #1e3a8a; /* Alterado para azul */
          outline: none;
        }
        ul.notifications-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li.notification-item {
          background: white;
          border-radius: 16px;
          padding: 16px 20px;
          margin-bottom: 16px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: default;
          user-select:none;
          transition: background-color 0.3s ease;
          position: relative;
        }
        li.notification-item.unread {
          background: #dcfce7;
          border-left: 6px solid #3b82f6; /* Alterado para azul */
        }
        li.notification-item:hover {
          background-color: #e6ffed;
        }
        .priority-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .notification-content {
          flex-grow: 1;
        }
        .notification-message {
          font-weight: 600;
          margin-bottom: 4px;
          color: #111827;
        }
        .notification-date {
          font-size: 0.85rem;
          color: #6b7280;
        }
        button.toggle-read {
          background: none;
          border: none;
          color: #3b82f6; /* Alterado para azul */
          cursor: pointer;
          font-size: 15px;
          padding: 4px;
          transition: color 0.3s ease;
        }
        button.toggle-read:hover,
        button.toggle-read:focus {
          color: #1e3a8a; /* Alterado para azul */
          outline: none;
        }
        button.toggle-read.read {
          color: #9ca3af;
        }
      `}</style>

      <section className="notifications-container" aria-label="Notificações do sistema">
        <h1>Notificações</h1>
        <button 
          className="mark-all" 
          onClick={markAllAsRead} 
          aria-label="Marcar todas as notificações como lidas"
        >
          Marcar todas como lidas
        </button>

        <ul className="notifications-list" role="list" aria-live="polite" aria-relevant="additions">
          {notifications.length === 0 ? (
            <li className="notification-item" style={{justifyContent: 'center'}}>
              Sem notificações recentes.
            </li>
          ) : (
            notifications.map(notification => (
              <li 
                key={notification.id} 
                className={`notification-item ${!notification.read ? 'unread' : ''}`}
                aria-label={`${notification.message}, prioridade ${notification.priority}, ${notification.read ? 'lida' : 'não lida'}`}
                tabIndex={0}
              >
                <span 
                  className="priority-indicator" 
                  style={{backgroundColor: priorityColor[notification.priority]}}
                  aria-hidden="true"
                />
                <div className="notification-content">
                  <div className="notification-message">{notification.message}</div>
                  <div className="notification-date">{new Date(notification.date).toLocaleDateString('pt-BR')}</div>
                </div>
                <button 
                  aria-label={notification.read ? "Marcar como não lida" : "Marcar como lida"}
                  className={`toggle-read ${notification.read ? 'read' : ''}`}
                  onClick={() => toggleRead(notification.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter') toggleRead(notification.id)}}
                  title={notification.read ? "Marcar como não lida" : "Marcar como lida"}
                >
                  {notification.read ? 'marcar como não lido' : 'marcar como lido'}
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
    </>
  );
}
